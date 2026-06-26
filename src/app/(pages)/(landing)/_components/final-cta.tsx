import Link from "next/link";
import { cn } from "@/lib/utils";

type FinalCTAProps = {
  isAuthenticated?: boolean;
};

export function FinalCTA({ isAuthenticated = false }: FinalCTAProps) {
  const ctaHref = isAuthenticated ? "/dashboard" : "/signup";
  const ctaLabel = isAuthenticated
    ? "Open dashboard"
    : "Create your free account";

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#070b1f] px-6 py-10 shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:px-10 lg:px-16 lg:py-14">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,24,0.4)_0%,transparent_60%),url('/images/cta-background.png')] bg-cover bg-right bg-no-repeat" />
          <div className="absolute inset-px rounded-[23px] ring-1 ring-white/5" />

          <div className="relative z-10 max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-200/80">
              Ready to write faster?
            </p>

            <h2 className="max-w-lg text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[40px] lg:leading-[1.04]">
              Generate your next campaign email in seconds
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-300/88 sm:text-base">
              Turn a short brief into polished outreach, sales, lifecycle, and follow-up emails with the right tone and length.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={ctaHref}
                className="inline-flex h-12 items-center justify-center rounded-full bg-violet-200 px-6 text-sm font-semibold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
