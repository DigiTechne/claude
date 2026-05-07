import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "template-next-stack — modern Next.js starter",
  description:
    "A batteries-included Next.js template with auth, database, email, and a polished UI out of the box.",
  openGraph: {
    title: "template-next-stack",
    description:
      "A batteries-included Next.js template with auth, database, email, and a polished UI out of the box.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">template-next-stack</h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
        A modern Next.js starter with auth, database, email, and a polished UI. Skip the setup,
        start building.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<Link href="/signup">Sign up</Link>} />
        <Button size="lg" variant="outline" render={<Link href="/login">Log in</Link>} />
      </div>
    </div>
  );
}
