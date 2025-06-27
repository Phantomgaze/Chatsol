import { Navbar1Demo as NavBar } from '@/components/navbar';
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/testimony";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from '@/components/ui/animated-hero'


      
   

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <NavBar />
      {/* <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8"> */}
            {/* Left Column - Image
            <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-start">
              <div className="max-w-[400px] w-full">
                <Image
                  src="/images/iphonecorinna.png"
                  width={400}
                  height={100}
                  alt="Chatsol AI on iPhone"
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Right Column - Content */}
            {/* <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm mb-4">
                An AI powered sales assistant chatbot
              </span>
              <div className="w-full max-w-[500px] mb-4">
                <TypingAnimation text="Chatsol AI" />
              </div>
              <p className="text-muted-foreground text-lg max-w-[500px] mb-6">
                Your AI powered sales assistant! Embed Chatsol AI into any website
                with just a snippet of code!
              </p>
              <Button asChild className="bg-orange font-bold text-white px-6 py-2 text-base">
                <Link href="/dashboard">Try For Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>   */}
      <Hero />
      

      <section className="py-16 bg-gray-50">
        <div className="flex flex-col items-center justify-center container mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange">
              Appointment Booking Made Simple
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl mb-10">
              Your Assistant simplifies scheduling and ensures user book your
              appointment hassle-free.
            </p>
          </header>
          <img
            src="https://ucarecdn.com/2e758e20-06c5-4a30-b320-ad3f69cb1902/undraw_booking_re_gw4j.svg"
            alt="Appointment Booking"
            className="w-full h-1/2 max-w-md object-contain"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="flex flex-col items-center justify-center container mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange">
              Effortless Email Marketing Campaigns{" "}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl">
              Easily create and manage email campaigns with our intuitive tools.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl">
              Add contacts, craft your message, and send emails with just one
              click.
            </p>
          </header>
          <Image
            src="https://ucarecdn.com/8c5e9793-ed56-4b36-a77f-34a3a6ef334f/undraw_email_campaign_re_m6k5.svg"
            alt="Appointment Booking"
            className="w-full h-max max-w-md object-contain"
            width={400}
            height={500}
          />
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center flex-col text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange">
            {" "}
            Choose what fits you right
          </h1>
          <p className="text-muted-foreground text-center max-w-lg">
            Our straightforward pricing plans are tailored to meet your needs.
          </p>
          <p className="text-muted-foreground text-center max-w-lg">
            If
            {" you're"} not ready to commit you can get started for free.
          </p>
        </div>

        <div className="flex  justify-center gap-4 flex-wrap mt-8">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": card.title === "Unlimited",
              })}
            >
              <CardHeader>
                <CardTitle className="text-orange">{card.title}</CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card.title)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">
                  <span>/ month</span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/dashboard?plan=${card.title}`}
                  className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center font-bold rounded-md"
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
          </div>
        </div>
      </section>
      <Testimonials />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange">
              Get started for free
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl mb-6">
              Play around with it first. Pay and add your team later.
            </p>
            <Button
              asChild
              className="bg-orange font-bold text-white px-4 mt-4"
            >
              <Link href="/dashboard">Try For Free</Link>
            </Button>
          </header>
          <div className="relative w-full h-1/2 max-w-md">
            <img
              src="https://ucarecdn.com/f0b02066-a781-4f8e-ae6e-da88043494cd/notionparade.webp"
              alt="Notion Parade"
              className="w-full  object-contain"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}