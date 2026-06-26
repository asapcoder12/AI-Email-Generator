import Image from "next/image";
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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-lg bg-teal px-6 py-16 text-teal-foreground sm:px-10 lg:px-16 lg:py-24">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          src="/images/cta-background.png"
        />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-on-dark-mute">
              Ready to write faster?
            </p>
            <h2 className="mt-4 max-w-xl text-[28px] font-[540] leading-[1.14] tracking-normal">
              Ready to stop wrestling with a blank page?
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-lg font-[540] leading-[1.5] text-on-dark-mute">
              Generate better email starting points and get your message out
              faster.
            </p>
            <div className="mt-7">
              <Button
                asChild
                className="px-7"
                size="lg"
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
