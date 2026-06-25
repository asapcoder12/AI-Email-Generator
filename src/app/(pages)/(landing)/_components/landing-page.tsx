import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MailCheck,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const benefits = [
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

const faqs = [
  {
    question: "Can a real AI model be connected later?",
    answer:
      "Yes. The system is designed to integrate with leading AI providers and can be extended as your team's needs evolve.",
  },
  {
    question: "Is authentication real?",
    answer:
      "Yes. Registration, login, and session management are fully implemented with secure, production-grade authentication.",
  },
  {
    question: "Can this be used on mobile?",
    answer:
      "Yes. The landing page, pricing flow, auth screens, dashboard, and profile are designed for desktop, tablet, and mobile viewports.",
  },
];

type LandingPageProps = {
  isAuthenticated?: boolean;
};

export function LandingPage({ isAuthenticated = false }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader isAuthenticated={isAuthenticated} variant="dark" />
      <main>
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="hero-surface absolute inset-0" />
          <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="animate-enter">
              <h1 className="max-w-3xl text-4xl font-semibold leading-none tracking-normal sm:text-5xl lg:text-6xl">
                AI Email Generator for campaigns that need to move today
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                Write clear outreach, sales, lifecycle, and follow-up emails
                from one topic. Choose the tone, choose the length, and ship a
                polished draft faster.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="hero">
                  <Link href="/signup">
                    Start generating
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="border-white/20 text-white hover:bg-white/10"
                  size="lg"
                  variant="outline"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
            <div className="animate-enter animate-enter-delay-1 rounded-lg border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <div className="rounded-md bg-background p-5 text-foreground">
                <div className="flex items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Generator preview
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      Product launch follow-up
                    </h2>
                  </div>
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div className="mt-5 grid gap-3">
                  {["Tone: Professional", "Length: Medium", "Ready to copy"].map(
                    (item) => (
                      <div
                        className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm"
                        key={item}
                      >
                        <CheckCircle2 className="size-4 text-primary" />
                        {item}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-5 rounded-md border bg-white p-4">
                  <p className="text-sm font-semibold">
                    Subject: Update: product launch follow-up
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    I wanted to share a focused update about your launch and
                    make the next step easy to act on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="animate-enter mx-auto max-w-4xl text-center">
            <MailCheck className="mx-auto size-10 text-primary" />
            <h2 className="mt-5 text-3xl font-semibold tracking-normal sm:text-4xl">
              A focused writing workspace for everyday business email
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The workflow is direct: sign in, describe the topic, tune the
              style, generate, and copy the draft. Built to integrate with
              advanced AI models as your needs grow.
            </p>
          </div>
        </section>

        <section className="bg-secondary px-4 py-20 sm:px-6 lg:px-8" id="benefits">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Benefits
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                Built for speed without locking the architecture
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const delayClass =
                  index === 1
                    ? "animate-enter-delay-1"
                    : index === 2
                      ? "animate-enter-delay-2"
                      : "";

                return (
                  <Card
                    className={`animate-enter ${delayClass} hover:border-primary/30 hover:shadow-md`}
                    key={benefit.title}
                  >
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-md bg-primary text-white">
                        <Icon className="size-5" />
                      </span>
                      <CardTitle>{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8" id="faq">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">
                Questions before your first generated email
              </h2>
            </div>
            <Accordion
              className="animate-enter flex flex-col gap-3"
              collapsible
              type="single"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  className="rounded-lg border border-b-0 bg-background px-5 shadow-sm"
                  key={faq.question}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="hover:no-underline data-[state=open]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="animate-enter mx-auto max-w-6xl overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-2xl">
            <div className="hero-surface px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-normal sm:text-4xl">
                Ready to stop wrestling with a blank page?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
                Generate better email starting points and get your message out faster.
              </p>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" variant="hero">
                  <Link href="/signup">
                    Create your account
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
