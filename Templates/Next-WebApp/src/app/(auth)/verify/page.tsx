import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Verify email",
};

interface VerifyPageProps {
  searchParams: Promise<{ token?: string; error?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { token, error } = await searchParams;

  // If we got redirected back here with an error, show it.
  if (error) {
    return (
      <Card className="w-full max-w-sm gap-6 py-6">
        <CardHeader>
          <CardTitle className="text-xl">Verification failed</CardTitle>
          <CardDescription>
            {error === "INVALID_TOKEN"
              ? "This verification link is invalid or has already been used."
              : error === "EXPIRED_TOKEN"
                ? "This verification link has expired. Please request a new one."
                : `Something went wrong: ${error}.`}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button render={<Link href="/login">Back to login</Link>} />
        </CardFooter>
      </Card>
    );
  }

  // No token in URL — nothing to verify.
  if (!token) {
    return (
      <Card className="w-full max-w-sm gap-6 py-6">
        <CardHeader>
          <CardTitle className="text-xl">No verification token</CardTitle>
          <CardDescription>
            This page is for verifying your email. Open the verification link in your inbox.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button render={<Link href="/login">Back to login</Link>} />
        </CardFooter>
      </Card>
    );
  }

  // Attempt verification server-side.
  let success = false;
  let message = "";
  try {
    const result = await auth.api.verifyEmail({ query: { token } });
    success = result?.status ?? false;
    if (!success) {
      message = "Verification could not be completed.";
    }
  } catch (err) {
    success = false;
    message = err instanceof Error ? err.message : "Verification failed.";
  }

  return (
    <Card className="w-full max-w-sm gap-6 py-6">
      <CardHeader>
        <CardTitle className="text-xl">
          {success ? "Email verified" : "Verification failed"}
        </CardTitle>
        <CardDescription>
          {success
            ? "Your email has been verified. You can now log in to your account."
            : message || "We couldn't verify your email. The link may be invalid or expired."}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button render={<Link href="/login">Go to login</Link>} />
      </CardFooter>
    </Card>
  );
}
