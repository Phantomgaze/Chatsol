import { useToast } from "@/components/ui/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });
  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        console.log("Signing in with:", values);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        console.log("Authenticated:", authenticated);

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          //
          console.log("Redirecting to /dashboard");
          router.refresh();
          router.push("/dashboard");
        } else {
          setLoading(false);
          toast({
            title: "Error",
            description: "Authentication not complete",
          });
        }
      } catch (error: any) {
        setLoading(false);
        console.error("Sign-in error:", error);
        if (error.errors[0].code === "form_password_incorrect")
          toast({
            title: "Error",
            description: "email/password is incorrect try again",
          });
        else if (error.errors[0].code === "session_exists")
          toast({
            title: "Error",
            description: "You are already signed in!",
          });
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};