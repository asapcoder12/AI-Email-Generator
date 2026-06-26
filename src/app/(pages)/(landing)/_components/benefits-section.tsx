import type { LucideIcon } from "lucide-react";
import { Clock, PenLine, ShieldCheck } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: "Drafts in seconds",
    description:
      "Turn a topic into a usable first draft without staring at a blank page.",
  },
  {
    icon: PenLine,
    title: "Tone control",
    description:
      "Switch between professional, friendly, persuasive, and concise styles.",
  },
  {
    icon: ShieldCheck,
    title: "Provider-ready architecture",
    description:
      "Designed with a modular architecture that scales with your team and integrates with leading AI providers.",
  },
];

export function BenefitsSection() {
  return (
    <section
      className="bg-background px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10"
      id="benefits"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[520px]">
          <p className="text-xs font-[540] uppercase text-primary">
            Built for speed.
          </p>
          <h2 className="mt-4 text-[28px] font-[540] leading-[1.14] tracking-normal text-foreground md:text-[48px] md:font-[460] md:leading-[0.96]">
            Built for speed without locking the architecture
          </h2>
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <Card
                className="rounded-lg border-border bg-card"
                key={benefit.title}
              >
                <CardHeader className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-5 gap-y-3 p-8">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <CardTitle className="text-[22px] font-[460] leading-[1.1]">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="mt-4 text-base font-[460] leading-6 text-muted-foreground">
                      {benefit.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
