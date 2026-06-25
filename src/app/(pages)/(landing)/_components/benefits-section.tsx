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
          <p className="text-xs font-semibold uppercase text-[#5432d3]">
            Built for speed.
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.04] tracking-normal text-foreground sm:text-[34px]">
            Built for speed without locking the architecture
          </h2>
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <Card
                className="rounded-xl border-border bg-card shadow-[0_12px_30px_rgba(27,25,56,0.04)]"
                key={benefit.title}
              >
                <CardHeader className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-5 gap-y-3 p-8">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-[#5b32d6] text-white shadow-[0_10px_22px_rgba(91,50,214,0.22)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <CardTitle className="text-base font-semibold leading-6">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="mt-4 text-sm leading-7 text-[#5f5c59]">
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
