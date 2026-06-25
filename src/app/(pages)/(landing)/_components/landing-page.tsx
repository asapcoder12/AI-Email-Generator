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
        <div className="landing-hero-surface relative overflow-hidden">
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
