import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing plans for template-next-stack.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</h1>
      <p className="text-muted-foreground mt-6 text-lg">Add your pricing tiers here.</p>
    </div>
  );
}
