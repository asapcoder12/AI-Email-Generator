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
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#070b1f] px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,24,0.4)_0%,transparent_60%),url('/images/cta-background.png')] bg-cover bg-right bg-no-repeat" />
          <div className="absolute inset-px rounded-[23px] ring-1 ring-white/5" />

          <div className="relative z-10 max-w-xl">
            <p className="mb-4 text-[14px] font-[600] uppercase tracking-[0.1em] text-violet-soft">
              Ready to write faster?
            </p>

            <h2 className="max-w-lg text-[36px] font-[460] leading-[0.96] tracking-[-1.32px] text-white sm:text-[48px]">
              Generate your next campaign email in seconds
            </h2>

            <p className="mt-5 max-w-md text-[18px] font-[540] leading-[1.5] tracking-[-0.135px] text-on-dark-mute">
              Turn a short brief into polished outreach, sales, lifecycle, and follow-up emails with the right tone and length.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-md bg-violet-soft px-[20px] py-[12px] text-[16px] font-[700] leading-none text-primary transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
