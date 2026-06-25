import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpgradeDialog } from "./_components/upgrade-dialog";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For trying the generator with mock AI.",
    features: ["Mock generation", "Tone and length controls", "Supabase login"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For teams that want the premium journey next.",
    features: ["Everything in Free", "Priority provider integration", "Team-ready workflow"],
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    description: "For larger teams preparing real model rollout.",
    features: ["Everything in Pro", "Usage governance", "Review-ready architecture"],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent">Premium flow MVP</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Choose a plan for faster email production
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Pricing is intentionally UI-only for this release. The Upgrade
              action is present and ready for a future Stripe integration.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                className={
                  plan.featured
                    ? "border-primary bg-primary text-primary-foreground"
                    : undefined
                }
                key={plan.name}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.featured ? (
                      <Sparkles className="size-5 text-accent" />
                    ) : null}
                  </div>
                  <CardDescription
                    className={plan.featured ? "text-white/70" : undefined}
                  >
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-semibold">
                    {plan.price}
                    <span className="text-base font-medium opacity-70">/mo</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li className="flex items-start gap-2 text-sm" key={feature}>
                        <Check className="mt-0.5 size-4 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    {plan.name === "Free" ? (
                      <Button asChild className="w-full" variant="outline">
                        <Link href="/signup">Start free</Link>
                      </Button>
                    ) : (
                      <UpgradeDialog planName={plan.name} />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
