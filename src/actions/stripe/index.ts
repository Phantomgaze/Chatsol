'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
})

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'usd',
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId }
    )

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateSubscription = async (
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
) => {
  try {
    const user = await currentUser()
    if (!user) return
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: plan == 'PRO' ? 50 : plan == 'ULTIMATE' ? 500 : 10,
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    })
    if (update) {
      return {
        status: 200,
        message: 'subscription updated',
        plan: update.subscription?.plan,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const setPlanAmount = (item: 'STANDARD' | 'PRO' | 'ULTIMATE') => {
  if (item === 'PRO') {
    return 1500
  }
  if (item === 'ULTIMATE') {
    return 3500
  }
  return 0
}

export const onGetStripeClientSecret = async (
  item: 'STANDARD' | 'PRO' | 'ULTIMATE'
) => {
  // For 'STANDARD' (free) plan, no PaymentIntent is needed.
  if (item === 'STANDARD') {
    console.log('STANDARD plan selected, no client secret generated from PaymentIntent.');
    return { secret: null }; 
  }

  try {
    const amount = setPlanAmount(item);

    // Ensure amount is valid for PRO/ULTIMATE before creating PaymentIntent
    if (amount <= 0) {
        console.error('Amount for PaymentIntent is zero or less for a non-STANDARD plan:', item);
        return { secret: null };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
      // Consider adding customer ID if available: customer: userStripeId,
      // Consider setup_future_usage if saving card: setup_future_usage: 'on_session',
    });

    if (paymentIntent && paymentIntent.client_secret) {
      return { secret: paymentIntent.client_secret };
    } else {
      console.error('Failed to create PaymentIntent or client_secret is missing for plan:', item);
      return { secret: null };
    }
  } catch (error) {
    console.error('Error creating PaymentIntent for plan:', item, error);
    return { secret: null };
  }
}