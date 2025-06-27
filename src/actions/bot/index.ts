'use server'

import { client } from '@/lib/prisma'
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils'
import { onRealTimeChat } from '../conversation'
import { clerkClient } from '@clerk/nextjs'
import { onMailer } from '../mailer'

export const onStoreConversations = async (
  id: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  })
}

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    })

    if (chatbot) {
      return chatbot
    }
  } catch (error) {
    console.log(error)
  }
}

let customerEmail: string | undefined

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'user',
  message: string
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    })
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message)
      if (extractedEmail) {
        customerEmail = extractedEmail[0]
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        })
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          })
          if (newCustomer) {
            console.log('new customer made')
            const response = {
              role: 'assistant',
              content: `Welcome aboard ${
                customerEmail.split('@')[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            }
            return { response }
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          )
          
          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            'user',
            author
          )

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            )

            onMailer(user.emailAddresses[0].emailAddress)

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            })

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              }
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          }
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        )

        const groqApiPayload = {
          model: 'llama3-70b-8192', // Using Llama 3 70B on Groq
          messages: [
            {
              role: 'assistant',
              content: `
              You will get an array of questions that you must ask the customer. 
              
              Progress the conversation using those questions. 
              
              Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
              
              Do not forget it.

              only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

              Always maintain character and stay respectfull.

              The array of questions : [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(', ')}]

              if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime)
              
              if the customer is frustrated, upset or angry and you can no longer help. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime)

              if the customer asks a question that is not in the array of questions. Formulate a response and if you cannot, simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime)

              if the customer asks for a real person or a human being. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime)

              if you have exhausted all the questions in the array. Ask the customer if they have any other questions, if they dont, end the conversation with a keyword (bot) at the end.

              if the customer provides an email address, you must extract it and save it. and then welcome the customer: welcome {customername}, I am {your name} how can i help you today?

              The user that has the problem is ${customerEmail}
              The bot is ${chatBotDomain.name}

              The first question in the array is always the first question that you must ask. unless the customer has provided an email address. In that case, you must welcome the customer first.
              `,
            },
            ...chat,
          ],
        };

        let chatCompletion;
        try {
          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Ensure GROQ_API_KEY is set in .env
            },
            body: JSON.stringify(groqApiPayload),
          });

          if (!groqResponse.ok) {
            const errorBody = await groqResponse.text();
            console.error('Groq API Error Status:', groqResponse.status);
            console.error('Groq API Error Body:', errorBody);
            throw new Error(`Groq API request failed with status ${groqResponse.status}: ${errorBody}`);
          }

          chatCompletion = await groqResponse.json();

          if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices.length || !chatCompletion.choices[0].message) {
            console.error('Groq API Error: Unexpected response structure', chatCompletion);
            throw new Error('Groq API returned an unexpected response structure');
          }
        } catch (error) {
          console.error('Failed to call Groq API:', error);
          const errorResponse = {
            role: 'assistant',
            content: 'I apologize, but I encountered an issue while trying to process your request with the AI service. Please try again shortly.',
          };
          if (checkCustomer?.customer[0]?.chatRoom[0]?.id) {
             await onStoreConversations(checkCustomer.customer[0].chatRoom[0].id, errorResponse.content, 'assistant');
             onRealTimeChat(
               checkCustomer.customer[0].chatRoom[0].id,
               errorResponse.content,
               'assistant',
               'assistant'
             );
          }
          return { response: errorResponse };
        }

        if (chatCompletion.choices[0].message.content?.includes('(realtime)')) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          })

          if (realtime) {
            const response = {
              role: 'assistant',
              content: chatCompletion.choices[0].message.content.replace(
                '(realtime)',
                ''
              ),
            }

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              'assistant'
            )

            return { response }
          }
        }
        if (chat[chat.length - 1].content.includes('(complete)')) {
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: 'asc',
              },
            })
          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            })
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          )

          if (generatedLink) {
            const link = generatedLink[0]
            const response = {
              role: 'assistant',
              content: `Great! you can follow the link to proceed`,
              link: link.slice(0, -1),
            }

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              'assistant'
            )

            return { response }
          }

          const response = {
            role: 'assistant',
            content: chatCompletion.choices[0].message.content,
          }

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            'assistant'
          )

          return { response }
        }
      }
      console.log('No customer')
      // Switched to Groq API
      const groqApiPayloadNoCustomer = {
        model: 'llama3-70b-8192', // Using Llama 3 70B on Groq
        messages: [
          {
            role: 'assistant',
            content: `
            You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
            Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

            Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

          `,
          },
          ...chat,
          {
            role: 'user',
            content: message,
          },
        ],
      };

      let chatCompletion;
      try {
        const groqResponseNoCustomer = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify(groqApiPayloadNoCustomer),
        });

        if (!groqResponseNoCustomer.ok) {
          const errorBody = await groqResponseNoCustomer.text();
          console.error('Groq API Error Status (No Customer):', groqResponseNoCustomer.status);
          console.error('Groq API Error Body (No Customer):', errorBody);
          throw new Error(`Groq API request failed with status ${groqResponseNoCustomer.status}: ${errorBody}`);
        }

        chatCompletion = await groqResponseNoCustomer.json();

        if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices.length || !chatCompletion.choices[0].message) {
          console.error('Groq API Error (No Customer): Unexpected response structure', chatCompletion);
          throw new Error('Groq API returned an unexpected response structure (No Customer)');
        }
      } catch (error) {
        console.error('Failed to call Groq API (No Customer):', error);
        const errorResponse = {
          role: 'assistant',
          content: 'I apologize, but I encountered an issue while trying to process your request with the AI service. Please try again shortly.',
        };
        // Note: No chatRoom ID available here to store/send real-time error, as customer is not yet identified.
        return { response: errorResponse };
      }

      if (chatCompletion) {
        const response = {
          role: 'assistant',
          content: chatCompletion.choices[0].message.content,
        }

        return { response }
      }
    }
  } catch (error) {
    console.log(error)
  }
}