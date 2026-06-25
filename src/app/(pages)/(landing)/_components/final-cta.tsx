import Link from "next/link";
import { Button } from "@/components/ui/button";

type FinalCTAProps = {
  isAuthenticated?: boolean;
};

export function FinalCTA({ isAuthenticated = false }: FinalCTAProps) {
  const ctaHref = isAuthenticated ? "/dashboard" : "/signup";
  const ctaLabel = isAuthenticated
    ? "Open dashboard"
    : "Create your free account";

  return (
    <section className="bg-background px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-10">
      <div className="teal-cta-pattern mx-auto max-w-6xl overflow-hidden rounded-xl px-6 py-10 text-white sm:px-10 lg:px-16 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-white/75">
              Ready to write faster?
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.05] tracking-normal sm:text-4xl">
              Ready to stop wrestling with a blank page?
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-base leading-7 text-white/75">
              Generate better email starting points and get your message out
              faster.
            </p>
            <div className="mt-7">
              <Button
                asChild
                className="h-12 rounded-lg px-7 text-sm font-semibold"
                variant="teal"
              >
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
