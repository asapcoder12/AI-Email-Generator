import { CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const trustPoints = ["No credit card", "Free forever plan", "Cancel anytime"];

type HeroSectionProps = {
  isAuthenticated?: boolean;
};

export function HeroSection({ isAuthenticated = false }: HeroSectionProps) {
  const ctaHref = isAuthenticated ? "/dashboard" : "/signup";
  const ctaLabel = isAuthenticated ? "Open dashboard" : "Get started free";

  return (
    <section
      aria-labelledby="landing-hero-title"
      className="relative z-10 mx-auto grid w-full max-w-7xl gap-9 px-5 pb-14 pt-10 sm:px-8 sm:pb-18 sm:pt-14 lg:min-h-[690px] lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:items-start lg:gap-0 lg:px-10 lg:pb-10 lg:pt-16"
    >
      <div className="max-w-[540px]">
        <p className="flex items-center gap-3 text-sm font-semibold text-accent">
          <Sparkles className="size-5" aria-hidden="true" />
          Write better. Send faster.
        </p>
        <h1
          className="mt-6 text-[42px] font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-[54px]"
          id="landing-hero-title"
        >
          AI email generator for campaigns that need to move today
        </h1>
        <p className="mt-6 max-w-[560px] text-base leading-7 text-white/75">
          Write outreach, sales, lifecycle, and follow-up emails from one
          topic. Choose the tone, the length, and ship a polished draft faster.
        </p>
        <div className="mt-7">
          <Button
            asChild
            className="h-12 rounded-lg px-9 text-sm"
            size="lg"
            variant="hero"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
        <ul className="mt-8 flex flex-col gap-4 text-xs text-white/70 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
          {trustPoints.map((point) => (
            <li className="flex items-center gap-2" key={point}>
              <CheckCircle2 className="size-3.5 text-white/80" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
