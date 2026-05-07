"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

function RequestResetForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");

    const { error: authError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset",
    });

    setIsPending(false);

    if (authError) {
      setError(authError.message ?? "Failed to send reset link.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <Card className="w-full max-w-sm gap-6 py-6">
        <CardHeader>
          <CardTitle className="text-xl">Check your inbox</CardTitle>
          <CardDescription>
            If an account exists for that email, you&apos;ll receive a password reset link shortly.
          </CardDescription>
        </CardHeader>
        <CardFooter className="text-sm">
          <Link href="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm gap-6 py-6">
      <CardHeader>
        <CardTitle className="text-xl">Reset your password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
            />
          </div>
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          <Button type="submit" disabled={isPending} className="mt-2 w-full">
            {isPending ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm">
        <Link href="/login" className="text-primary hover:underline">
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}

function NewPasswordForm({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "");

    const { error: authError } = await authClient.resetPassword({
      newPassword,
      token,
    });

    setIsPending(false);

    if (authError) {
      setError(authError.message ?? "Failed to reset password.");
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <Card className="w-full max-w-sm gap-6 py-6">
        <CardHeader>
          <CardTitle className="text-xl">Password updated</CardTitle>
          <CardDescription>
            Your password has been reset. You can now log in with your new password.
          </CardDescription>
        </CardHeader>
        <CardFooter className="text-sm">
          <Link href="/login" className="text-primary hover:underline">
            Go to login
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm gap-6 py-6">
      <CardHeader>
        <CardTitle className="text-xl">Choose a new password</CardTitle>
        <CardDescription>Enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={isPending}
            />
          </div>
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          <Button type="submit" disabled={isPending} className="mt-2 w-full">
            {isPending ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ResetPageInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (token) {
    return <NewPasswordForm token={token} />;
  }
  return <RequestResetForm />;
}

export default function ResetPage() {
  return (
    <Suspense fallback={null}>
      <ResetPageInner />
    </Suspense>
  );
}
