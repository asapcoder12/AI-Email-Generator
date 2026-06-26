"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  X,
  Target,
  Zap,
  Users,
  Check
} from "lucide-react";
import { FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type UpgradeDialogProps = {
  ctaLabel: string;
  planName: string;
};

type Step = "goals" | "email" | "success";

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

const TOTAL_STEPS = 3;

export function UpgradeDialog({ ctaLabel, planName }: UpgradeDialogProps) {
  const emailInputId = useId();
  const emailErrorId = `${emailInputId}-error`;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("goals");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const currentStepNumber = step === "goals" ? 1 : step === "email" ? 2 : 3;

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      // reset state after animation completes
      setTimeout(() => {
        setStep("goals");
        setEmail("");
        setEmailError(null);
        setSelectedGoal(null);
      }, 300);
    }
  }

  function handleGoalSelect(goalId: string) {
    setSelectedGoal(goalId);
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
            "fixed inset-0 z-[100] flex flex-col overflow-y-auto data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in landing-hero-surface",
          )}
        >
          <div className="landing-hero-copy-overlay flex min-h-full items-center justify-center p-4 py-12 sm:p-6 lg:p-8">
            <div className="w-full max-w-[520px] animate-enter">
              {/* Progress indicator */}
              {step !== "success" && (
                <div className="mb-8 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "size-2 rounded-full transition-all duration-300",
                          idx < currentStepNumber
                            ? "w-6 bg-accent"
                            : "bg-on-dark-faint"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-[460] text-on-dark-mute">
                    Step {currentStepNumber} of {TOTAL_STEPS}
                  </span>
                </div>
              )}

              {/* Goals step */}
              {step === "goals" && (
                <div className="relative rounded-[20px] border border-hairline-dark bg-primary-deep p-6 shadow-2xl sm:p-8">
                  <DialogPrimitive.Close className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-on-dark-mute transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-5 sm:top-5">
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                  <div className="space-y-8 animate-fade-up">
                    <div className="space-y-3 text-center">
                      <DialogPrimitive.Title className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-primary-foreground sm:text-[32px]">
                        What is your primary goal?
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="text-base font-[460] text-on-dark-mute sm:text-lg">
                        We customize the onboarding for {planName} users.
                      </DialogPrimitive.Description>
                    </div>
                    <div className="grid gap-3">
                      {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;
                        return (
                          <button
                            key={goal.id}
                            onClick={() => handleGoalSelect(goal.id)}
                            className={cn(
                              "group relative flex w-full items-center gap-4 rounded-lg border p-5 text-left transition-all",
                              isSelected
                                ? "border-accent bg-primary"
                                : "border-hairline-dark bg-transparent hover:border-accent/50 hover:bg-primary/50"
                            )}
                            aria-pressed={isSelected}
                          >
                            <div
                              className={cn(
                                "flex size-12 shrink-0 items-center justify-center rounded-lg transition-colors",
                                isSelected
                                  ? "bg-accent text-primary"
                                  : "bg-accent/10 text-accent group-hover:bg-accent/20"
                              )}
                            >
                              <Icon className="size-6" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                              <div className="text-base font-[600] text-primary-foreground sm:text-lg">
                                {goal.title}
                              </div>
                              <div className="mt-1 text-[13px] font-[460] leading-[1.4] text-on-dark-mute sm:text-sm">
                                {goal.desc}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent">
                                <Check className="size-4 text-primary" aria-hidden="true" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        type="button"
                        onClick={() => setStep("email")}
                        disabled={!selectedGoal}
                        className="h-12 w-full rounded-full bg-accent text-base font-[700] text-primary hover:bg-accent/90 disabled:opacity-50 sm:h-14 sm:text-lg"
                      >
                        Continue
                        <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Email step */}
              {step === "email" && (
                <div className="relative rounded-[20px] border border-hairline-dark bg-primary-deep p-6 shadow-2xl sm:p-8">
                  <DialogPrimitive.Close className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-on-dark-mute transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-5 sm:top-5">
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                  <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up" noValidate>
                    <div className="space-y-3 text-center">
                      <DialogPrimitive.Title className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-primary-foreground sm:text-[32px]">
                        Where should we send your invite?
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="text-base font-[460] text-on-dark-mute sm:text-lg">
                        We manually onboard teams to ensure the highest quality experience.
                      </DialogPrimitive.Description>
                    </div>
                    
                    <div className="space-y-6 rounded-lg border border-hairline-dark bg-primary p-6 sm:p-8">
                      <div className="space-y-2">
                        <Label
                          className="text-base font-[600] text-primary-foreground"
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
                          className="h-14 border-hairline-dark bg-primary/80 text-base text-primary-foreground placeholder:text-on-dark-faint focus-visible:ring-accent sm:text-lg"
                        />
                        {emailError ? (
                          <p
                            className="mt-2 text-sm font-[600] text-red-400"
                            id={emailErrorId}
                            role="alert"
                          >
                            {emailError}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-4 pt-2">
                        <Button
                          className="h-12 w-full rounded-full bg-accent text-base font-[700] text-primary hover:bg-accent/90 sm:h-14 sm:text-lg"
                          type="submit"
                        >
                          Request {planName} Access
                          <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
                        </Button>

                        <p className="flex items-center justify-center gap-2 text-[13px] font-[460] text-on-dark-mute sm:text-sm">
                          <Lock className="size-4 opacity-70" aria-hidden="true" />
                          Secure and private waitlist
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Success step */}
              {step === "success" && (
                <div className="relative rounded-[20px] border border-hairline-dark bg-primary-deep p-6 shadow-2xl sm:p-8">
                  <DialogPrimitive.Close className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-on-dark-mute transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-5 sm:top-5">
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                  <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-up">
                    <div className="flex size-20 items-center justify-center rounded-lg bg-accent/20 sm:size-24">
                      <CheckCircle2 className="size-10 text-accent sm:size-12" aria-hidden="true" />
                    </div>
                    <div className="space-y-3">
                      <DialogPrimitive.Title className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-primary-foreground sm:text-[32px]">
                        You're on the {planName} waitlist
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-md text-base font-[460] leading-[1.5] text-on-dark-mute sm:text-lg">
                        We've reserved your spot for {planName}. We will email you at <strong className="font-[600] text-primary-foreground">{email}</strong> when your workspace is ready.
                      </DialogPrimitive.Description>
                    </div>
                    <DialogPrimitive.Close asChild>
                      <Button
                        className="h-12 w-full max-w-[240px] rounded-full bg-accent text-base font-[700] text-primary hover:bg-accent/90 sm:h-14 sm:text-lg"
                        type="button"
                      >
                        Done
                      </Button>
                    </DialogPrimitive.Close>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
