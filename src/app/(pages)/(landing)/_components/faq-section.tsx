import { MailCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "Can a real AI model be connected later?",
    answer:
      "Yes. The generator is built around a provider boundary, so a production AI provider can be connected without replacing the product flow.",
  },
  {
    question: "Is authentication real?",
    answer:
      "Yes. Signup, login, protected routes, session handling, and sign out stay connected to Supabase Auth.",
  },
  {
    question: "Can this be used on mobile?",
    answer:
      "Yes. The marketing pages, pricing flow, authentication screens, dashboard, and profile are designed to work across desktop, tablet, and mobile.",
  },
  {
    question: "Is my data secure?",
    answer:
      "The app keeps authenticated areas protected and uses server-side boundaries for generation requests. Production deployments should still review environment settings and access policies.",
  },
];

const stats = [
  { value: "1,248+", label: "Drafts created" },
  { value: "82%", label: "Time saved weekly" },
  { value: "4.9", suffix: "/5", label: "Average rating" },
];

export function FAQSection() {
  return (
    <section
      className="bg-background px-5 pb-10 pt-10 sm:px-8 sm:pb-12 lg:px-10"
      id="faq"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase text-[#5432d3]">FAQ</p>
          <h2 className="mt-4 max-w-[420px] text-2xl font-semibold leading-[1.08] tracking-normal text-foreground sm:text-[28px]">
            Questions before your first generated email
          </h2>

          <Accordion
            className="mt-7 flex flex-col gap-3"
            collapsible
            type="single"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                className="rounded-lg border border-border bg-background px-4 shadow-[0_8px_22px_rgba(27,25,56,0.035)]"
                key={faq.question}
                value={`faq-${index}`}
              >
                <AccordionTrigger className="min-h-[52px] py-3 text-sm font-semibold text-foreground hover:text-primary hover:no-underline data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Card className="rounded-xl border-border bg-card p-6 shadow-[0_14px_34px_rgba(27,25,56,0.05)] sm:p-7">
          <div className="grid gap-5 border-b border-border pb-6 sm:grid-cols-[56px_minmax(0,1fr)]">
            <span className="flex size-14 items-center justify-center rounded-full bg-accent text-[#5432d3]">
              <MailCheck className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-semibold leading-tight text-foreground">
                Teams ship more, faster
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Join teams already saving hours every week.
              </p>
            </div>
          </div>

          <dl className="grid gap-5 border-b border-border py-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-3xl font-semibold leading-none text-[#17153d]">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="text-base font-medium text-muted-foreground">
                      {stat.suffix}
                    </span>
                  ) : null}
                </dd>
                <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <div className="grid gap-5 pt-6 sm:grid-cols-[56px_minmax(0,1fr)]">
            <div
              aria-hidden="true"
              className="size-14 rounded-full bg-[radial-gradient(circle_at_42%_34%,#fafaf8_0_12%,transparent_13%),linear-gradient(135deg,#c9b4fa,#155555)] ring-1 ring-border"
            />
            <figure>
              <blockquote className="text-sm leading-6 text-foreground">
                &quot;It&apos;s like having a first draft on demand. Our team
                moves faster and writes better.&quot;
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Jordan Lee, Growth Marketing Lead
              </figcaption>
            </figure>
          </div>
        </Card>
      </div>
    </section>
  );
}
