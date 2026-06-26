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
        <div className="landing-hero-surface relative overflow-hidden bg-primary">
          <Image
            alt=""
            className="landing-hero-image"
            height={848}
            priority
            sizes="(min-width: 1024px) 100vw, 820px"
            src="/images/hero-background.png"
            width={1774}
          />
          <div
            aria-hidden="true"
            className="landing-hero-copy-overlay absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="landing-hero-bottom-overlay absolute inset-0"
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
