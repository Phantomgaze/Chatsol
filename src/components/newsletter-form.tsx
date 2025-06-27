"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeToNewsletter, FormState } from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

const initialState: FormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-orange hover:bg-orange/90">
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
}

export function NewsletterForm() {
  const [state, formAction] = useFormState(subscribeToNewsletter, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div>
      <h4 className="font-semibold mb-2 text-foreground">Stay Updated</h4>
      <p className="text-muted-foreground text-sm mb-4">
        Subscribe to our newsletter to get the latest news and updates.
      </p>
      <form ref={formRef} action={formAction} className="flex items-start gap-2">
        <div className="flex-grow">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="max-w-xs"
          />
           {state.status === "error" && (
            <p className="text-red-500 text-xs mt-1">{state.message}</p>
          )}
          {state.status === "success" && (
            <p className="text-green-500 text-xs mt-1">{state.message}</p>
          )}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
