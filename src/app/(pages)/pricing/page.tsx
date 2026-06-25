import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpgradeDialog } from "./_components/upgrade-dialog";
import { getAuthenticatedClaims } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For trying the generator and saving first drafts.",
    features: ["Email draft generation", "Tone and length controls", "Supabase login"],
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
    features: ["Everything in Pro", "Usage governance", "Advanced configuration"],
    featured: false,
  },
];

export default async function PricingPage() {
  const claims = await getAuthenticatedClaims();
  const ctaHref = claims ? "/dashboard" : "/signup";
  const ctaLabel = claims ? "Open dashboard" : "Create account";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader isAuthenticated={Boolean(claims)} />
      <main>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="animate-enter mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Choose a plan for faster email production
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Start with the free plan and upgrade when your team needs more
              capacity and advanced features.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
            {plans.map((plan, index) => {
              const delayClass =
                index === 1
                  ? "animate-enter-delay-1"
                  : index === 2
                    ? "animate-enter-delay-2"
                    : "";

              return (
                <Card
                  className={
                    plan.featured
                      ? `animate-enter ${delayClass} border-primary bg-primary text-primary-foreground shadow-md`
                      : `animate-enter ${delayClass} hover:border-primary/30 hover:shadow-md`
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
              );
            })}
          </div>
        </section>
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="animate-enter mx-auto max-w-6xl rounded-lg bg-teal px-6 py-14 text-teal-foreground sm:px-10 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-white/70">
                  Ready to write faster
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal">
                  Start with the free workspace and upgrade when your workflow
                  needs more room.
                </h2>
              </div>
              <Button asChild size="lg" variant="teal">
                <Link href={ctaHref}>
                  {ctaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
