"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Loader2,
  X,
  Target,
  Zap,
  Users
} from "lucide-react";
import { FormEvent, useId, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type UpgradeDialogProps = {
  ctaLabel: string;
  planName: string;
};

type Step = "analyzing" | "goals" | "email" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string | null {
  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0) {
    return "Enter your work email.";
  }
  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return "Enter a valid work email.";
  }
  return null;
}

const goals = [
  { id: "speed", icon: Zap, title: "Personal speed", desc: "Generate drafts faster with higher quality" },
  { id: "team", icon: Users, title: "Team collaboration", desc: "Shared prompts and unified voice" },
  { id: "api", icon: Target, title: "Advanced usage", desc: "Scale with API and custom integrations" },
];

export function UpgradeDialog({ ctaLabel, planName }: UpgradeDialogProps) {
  const emailInputId = useId();
  const emailErrorId = `${emailInputId}-error`;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("analyzing");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  useEffect(() => {
    if (open && step === "analyzing") {
      const timer = setTimeout(() => {
        setStep("goals");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [open, step]);

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      // reset state after animation completes
      setTimeout(() => {
        setStep("analyzing");
        setEmail("");
        setEmailError(null);
        setSelectedGoal(null);
      }, 300);
    }
  }

  function handleGoalSelect(goalId: string) {
    setSelectedGoal(goalId);
    setStep("email");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }
    setEmailError(null);
    setStep("success");
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <Button
          className="h-12 w-full rounded-md"
          variant={planName === "Pro" ? "accent" : "default"}
        >
          {ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-[100] flex flex-col overflow-y-auto data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in hero-surface",
          )}
        >
          <div className="flex min-h-full items-center justify-center p-4 py-12 sm:p-6 lg:p-8">
            <DialogPrimitive.Close className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full bg-primary-deep text-on-dark-mute transition-colors hover:text-primary-foreground hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            <div className="w-full max-w-md animate-enter">
              {step === "analyzing" && (
                <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-up">
                  <Loader2 className="size-12 animate-spin text-accent" />
                  <div className="space-y-2">
                    <DialogPrimitive.Title className="text-2xl font-[540] tracking-tight text-primary-foreground">
                      Preparing workspace...
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-base text-on-dark-mute">
                      Checking {planName} environment availability
                    </DialogPrimitive.Description>
                  </div>
                </div>
              )}

              {step === "goals" && (
                <div className="flex flex-col space-y-8 animate-fade-up">
                  <div className="space-y-3 text-center">
                    <DialogPrimitive.Title className="text-[28px] font-[540] leading-tight tracking-tight text-primary-foreground">
                      What is your primary goal?
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-lg text-on-dark-mute">
                      We customize the onboarding for {planName} users.
                    </DialogPrimitive.Description>
                  </div>
                  <div className="grid gap-3">
                    {goals.map((goal) => {
                      const Icon = goal.icon;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => handleGoalSelect(goal.id)}
                          className="group flex w-full items-center gap-4 rounded-xl border border-hairline-dark bg-primary-deep/40 p-5 text-left transition-all hover:border-accent/50 hover:bg-primary-deep/80"
                        >
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/80 text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                            <Icon className="size-6" />
                          </div>
                          <div>
                            <div className="text-lg font-[460] text-primary-foreground">{goal.title}</div>
                            <div className="text-sm text-on-dark-mute">{goal.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === "email" && (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-8 animate-fade-up" noValidate>
                  <div className="space-y-3 text-center">
                    <DialogPrimitive.Title className="text-[28px] font-[540] leading-tight tracking-tight text-primary-foreground">
                      Where should we send your invite?
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-lg text-on-dark-mute">
                      We manually onboard teams to ensure the highest quality experience.
                    </DialogPrimitive.Description>
                  </div>
                  
                  <div className="space-y-6 rounded-2xl border border-hairline-dark bg-primary-deep/60 p-6 sm:p-8 backdrop-blur-md">
                    <div className="space-y-2">
                      <Label
                        className="text-base font-[460] text-on-dark-mute"
                        htmlFor={emailInputId}
                      >
                        Work email
                      </Label>
                      <Input
                        aria-describedby={emailError ? emailErrorId : undefined}
                        aria-invalid={Boolean(emailError)}
                        autoFocus
                        id={emailInputId}
                        name="email"
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (emailError) {
                            setEmailError(null);
                          }
                        }}
                        placeholder="you@company.com"
                        type="email"
                        value={email}
                        className="h-14 border-hairline-dark bg-primary/80 text-lg text-primary-foreground placeholder:text-on-dark-faint focus-visible:ring-accent"
                      />
                      {emailError ? (
                        <p
                          className="mt-2 text-sm font-medium text-red-400"
                          id={emailErrorId}
                          role="alert"
                        >
                          {emailError}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-4 pt-2">
                      <Button
                        className="h-14 w-full bg-accent text-lg font-bold text-primary hover:bg-accent/90"
                        type="submit"
                      >
                        <Mail className="mr-2 size-5" aria-hidden="true" />
                        Request VIP Access
                      </Button>

                      <p className="flex items-center justify-center gap-2 text-sm text-on-dark-mute">
                        <Lock className="size-4 opacity-70" aria-hidden="true" />
                        Secure and private waitlist
                      </p>
                    </div>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-up">
                  <div className="flex size-24 items-center justify-center rounded-full bg-accent/20">
                    <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
                  </div>
                  <div className="space-y-3">
                    <DialogPrimitive.Title className="text-[32px] font-[540] leading-tight tracking-tight text-primary-foreground">
                      You're on the list.
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="mx-auto max-w-sm text-lg text-on-dark-mute">
                      We've reserved your spot for {planName}. We will email you at <strong className="font-semibold text-primary-foreground">{email}</strong> when your workspace is ready.
                    </DialogPrimitive.Description>
                  </div>
                  <DialogPrimitive.Close asChild>
                    <Button
                      className="h-14 w-full max-w-[200px] bg-accent text-lg font-bold text-primary hover:bg-accent/90"
                      type="button"
                    >
                      Done
                    </Button>
                  </DialogPrimitive.Close>
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
