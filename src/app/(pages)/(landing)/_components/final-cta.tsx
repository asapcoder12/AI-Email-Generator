import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <div className="relative z-10 max-w-lg">
          <p className="text-xs font-[540] uppercase text-on-dark-mute">
            Ready to write faster?
          </p>
          <h2 className="mt-4 text-[28px] font-[540] leading-[1.14] tracking-normal">
            Create your next email in seconds
          </h2>
          <p className="mt-5 text-lg font-[540] leading-[1.5] text-on-dark-mute">
            Generate polished outreach, sales, and follow-up emails with AI.
          </p>
          <div className="mt-8">
            <Button asChild variant="teal">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
