"use server";

import { z } from "zod";

export type FormState = {
  message: string;
  status: "success" | "error" | "idle";
};

const SubscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// A simple function to simulate saving to a database
const saveEmail = async (email: string) => {
  console.log(`New subscriber: ${email}`);
  // In a real app, you would save this to your database.
  // For example: await db.newsletter.create({ data: { email } });
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
};


export async function subscribeToNewsletter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SubscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid email.",
      status: "error",
    };
  }

  try {
    await saveEmail(validatedFields.data.email);
    return {
      message: "Thank you for subscribing!",
      status: "success",
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Something went wrong. Please try again.",
      status: "error",
    };
  }
}
