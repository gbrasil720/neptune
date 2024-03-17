"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { createClient } from "@/utils/supabase/client";
import { AtSign } from "lucide-react";
import Image from "next/image";

export default function AuthPage() {
  const supabase = createClient();

  function signInWithGoogle() {
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })
      .then(async () => {
        const { data } = await supabase.auth.getSession();

        const id = data.session?.user?.identities?.[0]?.user_id ?? "";
        const name =
          data.session?.user.identities?.[0]?.identity_data?.name ?? "";
        const email =
          data.session?.user.identities?.[0]?.identity_data?.email ?? "";
        const telephone = data.session?.user.phone ?? "";

        await api.post("/manager/create", {
          id,
          name,
          email,
          telephone,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Image src="/logo.svg" alt="Neptune" width={120} height={120} />

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">neptune</h1>
            <p className="text-sm text-muted-foreground">
              The perfect company management app that you need.
            </p>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="w-full"
            onClick={signInWithGoogle}
          >
            <AtSign size={24} className="mr-2 size-4" />
            Sign in with Google
          </Button>
        </div>
        <p className="px-10 text-center text-sm leading-relaxed text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="https://google.com"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://google.com"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
