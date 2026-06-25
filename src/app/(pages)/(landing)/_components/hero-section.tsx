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
      className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:items-center lg:px-10 lg:pb-0 lg:pt-12"
    >
      <div className="max-w-[640px] pb-0 lg:pb-24">
        <p className="flex items-center gap-3 text-sm font-semibold text-accent sm:text-base">
          <Sparkles className="size-5" aria-hidden="true" />
          Write better. Send faster.
        </p>
        <h1
          className="mt-7 text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-[58px]"
          id="landing-hero-title"
        >
          AI email generator for campaigns that need to move today
        </h1>
        <p className="mt-7 max-w-[590px] text-base leading-8 text-white/75 sm:text-lg">
          Write outreach, sales, lifecycle, and follow-up emails from one
          topic. Choose the tone, the length, and ship a polished draft faster.
        </p>
        <div className="mt-8">
          <Button
            asChild
            className="h-14 rounded-lg px-10 text-base shadow-[0_18px_42px_rgba(201,180,250,0.28)] sm:rounded-xl"
            size="lg"
            variant="hero"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
        <ul className="mt-9 flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
          {trustPoints.map((point) => (
            <li className="flex items-center gap-2" key={point}>
              <CheckCircle2 className="size-4 text-white/80" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-[350px] sm:min-h-[460px] lg:min-h-[640px]">
        <div
          aria-hidden="true"
          className="portrait-placeholder absolute inset-0 overflow-hidden rounded-2xl border border-white/10 lg:-right-24 lg:left-auto lg:h-full lg:w-[min(700px,58vw)] lg:rounded-none lg:border-0"
        />
        <Sparkles
          className="absolute left-8 top-12 z-20 size-6 text-accent sm:left-12 lg:left-20 lg:top-24"
          aria-hidden="true"
        />
        <Sparkles
          className="absolute left-16 top-4 z-20 size-4 text-accent sm:left-24 lg:left-32 lg:top-16"
          aria-hidden="true"
        />
        <div className="absolute bottom-5 left-5 z-20 w-[min(20rem,calc(100%-2.5rem))] rounded-xl border border-white/30 bg-white/10 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:bottom-auto lg:left-0 lg:top-32 lg:w-72 lg:-translate-x-12">
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
