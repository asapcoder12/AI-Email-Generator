import { CheckCircle2, Copy, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const trustPoints = ["No credit card", "Free forever plan", "Cancel anytime"];

const previewDetails = [
  { label: "Tone", value: "Professional" },
  { label: "Length", value: "Medium" },
  { label: "Status", value: "Ready to copy" },
];

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

      <div className="relative min-h-[310px] sm:min-h-[360px] lg:min-h-0">
        <Sparkles
          className="absolute left-12 top-8 z-20 size-6 text-accent sm:left-40 lg:left-40 lg:top-9"
          aria-hidden="true"
        />
        <Sparkles
          className="absolute left-24 top-2 z-20 size-4 text-accent sm:left-52 lg:left-52 lg:top-0"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-2 z-20 w-[min(20rem,calc(100%-1rem))] rounded-xl border border-white/30 bg-[#1b1938]/55 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:left-24 lg:bottom-auto lg:left-0 lg:top-14 lg:w-72 lg:-translate-x-2">
          <p className="text-[11px] font-semibold uppercase tracking-normal text-white/70">
            Preview
          </p>
          <h2 className="mt-2 text-base font-semibold leading-tight">
            Demo follow-up
          </h2>

          <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
            {previewDetails.map((item) => (
              <div
                className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-3 text-xs"
                key={item.label}
              >
                <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
                <span className="text-white/75">{item.label}</span>
                <span className="text-right text-white/90">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-[11px] font-semibold text-white/70">Subject</p>
            <p className="mt-1 text-xs font-semibold leading-5">
              Quick follow-up on next steps
            </p>
            <p className="mt-3 pr-6 text-[11px] leading-5 text-white/70">
              Hi Alex, thanks again for the demo yesterday. I put together a
              short recap of the key points and a suggested next step ...
            </p>
          </div>

          <span className="absolute bottom-4 right-4 text-white/75">
            <Copy className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}
