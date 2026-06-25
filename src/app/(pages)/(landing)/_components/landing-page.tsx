import Image from "next/image";
import { BenefitsSection } from "./benefits-section";
import { FAQSection } from "./faq-section";
import { FinalCTA } from "./final-cta";
import { HeroSection } from "./hero-section";
import { MarketingHeader } from "./marketing-header";
import { TrustLogos } from "./trust-logos";

type LandingPageProps = {
  isAuthenticated?: boolean;
};

export function LandingPage({ isAuthenticated = false }: LandingPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <main>
        <div className="relative overflow-hidden bg-primary">
          <Image
            alt=""
            className="object-cover object-[63%_top]"
            fill
            priority
            sizes="100vw"
            src="/images/hero-background.png"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c1f_0%,rgba(14,12,31,0.96)_24%,rgba(14,12,31,0.72)_45%,rgba(14,12,31,0.12)_70%,rgba(14,12,31,0)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,31,0)_0%,rgba(14,12,31,0.16)_100%)]"
          />
          <MarketingHeader isAuthenticated={isAuthenticated} />
          <HeroSection isAuthenticated={isAuthenticated} />
        </div>
        <TrustLogos />
        <BenefitsSection />
        <FAQSection />
        <FinalCTA isAuthenticated={isAuthenticated} />
      </main>
    </div>
  );
}
