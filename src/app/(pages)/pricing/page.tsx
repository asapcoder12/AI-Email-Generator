import { ArrowRight, Check } from "lucide-react";
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
import { getAuthenticatedClaims } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { UpgradeDialog } from "./_components/upgrade-dialog";

export const dynamic = "force-dynamic";

type PricingPlan = {
  id: "free" | "pro" | "business";
  name: string;
  description: string;
  price: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
};

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying the generator and saving your first drafts.",
    price: "$0",
    features: ["Email draft generation", "Tone and length controls", "Supabase login"],
    highlighted: false,
    ctaLabel: "Get started free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For teams that want the premium journey next.",
    price: "$19",
    features: ["Everything in Free", "Priority provider integration", "Team-ready workflow"],
    highlighted: true,
    ctaLabel: "Upgrade to Pro",
  },
  {
    id: "business",
    name: "Business",
    description: "For larger teams preparing real model rollout.",
    price: "$49",
    features: ["Everything in Pro", "Usage governance", "Advanced configuration"],
    highlighted: false,
    ctaLabel: "Upgrade to Business",
  },
];

export default async function PricingPage() {
  const claims = await getAuthenticatedClaims();
  const freePlanHref = claims ? "/dashboard" : "/signup";
  const freePlanLabel = claims ? "Open dashboard" : "Get started free";

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-foreground">
      <SiteHeader
        activeHref="/pricing"
        isAuthenticated={Boolean(claims)}
        primaryCtaLabel="Get started free"
        showPublicSignIn={false}
      />
      <main className="bg-white">
        <section className="px-4 pt-10 sm:px-6 lg:px-8">
          <div className="animate-enter mx-auto max-w-[360px] text-center sm:max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-normal text-primary">
              SIMPLE PRICING, POWERFUL RESULTS
            </p>
            <h1 className="mt-6 text-balance text-[34px] font-[540] leading-[1] tracking-normal text-foreground sm:text-5xl sm:leading-[0.98] lg:text-[64px] lg:leading-[0.96]">
              Choose a plan for faster email production
            </h1>
            <p className="mx-auto mt-6 max-w-[350px] text-base font-[460] leading-7 text-muted-foreground sm:max-w-2xl sm:text-lg">
              Start with the free plan and upgrade as your workflow needs grow.
              More capacity, smarter controls, and advanced features—when
              you&apos;re ready.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-[1052px] items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const delayClass =
                index === 1
                  ? "animate-enter-delay-1"
                  : index === 2
                    ? "animate-enter-delay-2"
                    : "";
              const isHighlighted = plan.highlighted;

              return (
                <Card
                  className={cn(
                    "animate-enter relative flex min-h-[428px] flex-col rounded-[12px] border p-8 shadow-none",
                    delayClass,
                    isHighlighted
                      ? "border-transparent bg-[linear-gradient(145deg,var(--primary)_0%,var(--primary)_58%,var(--primary-hover)_100%)] text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                      : "border-border bg-white text-foreground hover:border-primary/20 hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
                  )}
                  key={plan.id}
                >
                  {isHighlighted ? (
                    <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold leading-none text-primary">
                      Most popular
                    </span>
                  ) : null}
                  <CardHeader className={cn("p-0", isHighlighted && "pt-8")}>
                    <CardTitle className="text-2xl font-[540] leading-[1.1] tracking-normal">
                      {plan.name}
                    </CardTitle>
                    <CardDescription
                      className={cn(
                        "mt-3 max-w-[240px] text-[15px] font-[460] leading-6",
                        isHighlighted ? "text-white/70" : "text-muted-foreground",
                      )}
                    >
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col p-0 pt-7">
                    <p className="leading-none">
                      <span className="text-5xl font-[540] tracking-normal">
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          "ml-1 text-base font-[460]",
                          isHighlighted ? "text-white/80" : "text-muted-foreground",
                        )}
                      >
                        /mo
                      </span>
                    </p>
                    <div
                      className={cn(
                        "mt-7 h-px w-full",
                        isHighlighted ? "bg-white/20" : "bg-border",
                      )}
                    />
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature) => (
                        <li
                          className={cn(
                            "flex items-start gap-3 text-sm font-[460] leading-5",
                            isHighlighted ? "text-white/90" : "text-foreground",
                          )}
                          key={feature}
                        >
                          <Check
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 size-4 shrink-0 stroke-[2.2]",
                              isHighlighted ? "text-white" : "text-primary",
                            )}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-9">
                      {plan.id === "free" ? (
                        <Button
                          asChild
                          className="h-12 w-full rounded-md border-border bg-white text-primary hover:bg-secondary"
                          variant="outline"
                        >
                          <Link href={freePlanHref}>
                            {freePlanLabel}
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                        </Button>
                      ) : (
                        <UpgradeDialog ctaLabel={plan.ctaLabel} planName={plan.name} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 lg:px-8">
          <div className="animate-enter relative mx-auto max-w-[1120px] overflow-hidden rounded-[12px] bg-teal px-8 py-10 text-teal-foreground sm:px-12 lg:px-16 lg:py-11">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-8 hidden h-36 w-48 opacity-40 [background-size:14px_14px] [background-image:radial-gradient(circle,rgba(255,255,255,0.38)_1px,transparent_1px)] md:block"
            />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-normal text-white/75">
                  READY TO WRITE FASTER?
                </p>
                <h2 className="mt-4 text-[28px] font-[540] leading-[1.14] tracking-normal sm:text-[32px]">
                  Start with the free workspace and upgrade as your workflow
                  grows.
                </h2>
              </div>
              <Button
                asChild
                className="h-[52px] w-full rounded-md px-8 text-base font-bold hover:bg-white/90 sm:w-[245px]"
                size="lg"
                variant="teal"
              >
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
