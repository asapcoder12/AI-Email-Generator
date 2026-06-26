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
  Check,
  Mail,
  ArrowLeft
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

type Step = "email" | "goals" | "success";

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
  { id: "Free", icon: Zap, title: "Free plan", desc: "Perfect for trying the generator and saving your first drafts." },
  { id: "Pro", icon: Users, title: "Pro plan", desc: "For teams that want the premium journey next." },
  { id: "Business", icon: Target, title: "Business plan", desc: "For larger teams preparing real model rollout." },
];

const TOTAL_STEPS = 3;

export function UpgradeDialog({ ctaLabel, planName }: UpgradeDialogProps) {
  const emailInputId = useId();
  const emailErrorId = `${emailInputId}-error`;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(planName);

  const currentStepNumber = step === "email" ? 1 : step === "goals" ? 2 : 3;

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setStep("email");
        setEmail("");
        setEmailError(null);
        setSelectedGoal(planName);
      }, 300);
    }
  }

  function handleGoalSelect(goalId: string) {
    setSelectedGoal(goalId);
  }

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }
    setEmailError(null);
    setStep("goals");
  }

  function handleGoalsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedGoal) return;
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
        {/* Overlay backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />

        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
          )}
        >
          {/* Centered Modal Card */}
          <div className="relative w-full max-w-[480px] animate-enter">
            {/* Close Button inside modal */}
            <DialogPrimitive.Close className="absolute right-4 top-4 z-20 flex size-8 items-center justify-center rounded-full text-[#9a9794] transition-colors hover:bg-[#fafaf8] hover:text-[#292827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
              {/* Email step */}
              {step === "email" && (
                <div className="relative rounded-xl border border-[#e8e4dd] bg-[#ffffff] p-6 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <div className="mb-6 flex justify-center animate-fade-up">
                    <div className="flex items-center gap-2 rounded-full border border-[#e8e4dd] bg-[#fafaf8] px-3 py-1.5 text-[12px] font-[540] text-[#73706d]">
                      <div className="size-2 rounded-full bg-[#1b1938]" aria-hidden="true" />
                      Step 1 of 3
                    </div>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-8 animate-fade-up" noValidate>
                    <div className="space-y-3 text-center">
                      <div className="text-[12px] font-[540] text-[#73706d]">
                        Get early access
                      </div>
                      <DialogPrimitive.Title className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-[#292827]">
                        Get your {planName} invite
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-[340px] text-[16px] font-[460] leading-[1.5] text-[#73706d]">
                        We manually onboard teams to maintain the highest quality experience.
                      </DialogPrimitive.Description>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <Label
                          className="text-[14px] font-[460] text-[#73706d]"
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
                          className="h-[44px] border-[#e8e4dd] bg-[#ffffff] text-[16px] font-[460] text-[#292827] placeholder:text-[#9a9794] rounded-sm focus-visible:ring-2 focus-visible:ring-[#1b1938] focus-visible:ring-offset-0"
                        />
                        {emailError && (
                          <p
                            className="mt-2 text-[14px] font-[460] text-red-500"
                            id={emailErrorId}
                            role="alert"
                          >
                            {emailError}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4 pt-2">
                        <Button
                          className="h-[44px] w-full rounded-md bg-[#1b1938] text-[16px] font-[700] text-[#ffffff] hover:bg-[#0e0c1f]"
                          type="submit"
                        >
                          Request {planName} Access
                          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                        </Button>

                        <p className="flex items-center justify-center gap-2 text-[14px] font-[460] text-[#9a9794]">
                          <Lock className="size-3.5" aria-hidden="true" />
                          Secure and private waitlist
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Goals step */}
              {step === "goals" && (
                <div className="relative rounded-xl border border-[#e8e4dd] bg-[#ffffff] p-6 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <div className="mb-6 flex justify-center animate-fade-up">
                    <div className="flex items-center gap-2 rounded-full border border-[#e8e4dd] bg-[#fafaf8] px-3 py-1.5 text-[12px] font-[540] text-[#73706d]">
                      <div className="size-2 rounded-full bg-[#1b1938]" aria-hidden="true" />
                      Step 2 of 3
                    </div>
                  </div>

                  <form onSubmit={handleGoalsSubmit} className="space-y-8 animate-fade-up">
                    <div className="space-y-3 text-center">
                      <div className="text-[12px] font-[540] text-[#73706d]">
                        Customize your experience
                      </div>
                      <DialogPrimitive.Title className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-[#292827]">
                        Which plan fits you best?
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-[340px] text-[16px] font-[460] leading-[1.5] text-[#73706d]">
                        Confirm the plan you&apos;d like to join the waitlist for.
                      </DialogPrimitive.Description>
                    </div>

                    <div className="grid gap-3">
                      {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;
                        return (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => handleGoalSelect(goal.id)}
                            className={cn(
                              "group relative flex w-full items-center gap-4 rounded-md border p-4 text-left transition-all",
                              isSelected
                                ? "border-[#1b1938] bg-[#fafaf8]"
                                : "border-[#e8e4dd] bg-[#ffffff] hover:border-[#9a9794]"
                            )}
                            aria-pressed={isSelected}
                          >
                            <div
                              className={cn(
                                "flex size-12 shrink-0 items-center justify-center rounded-md transition-colors border",
                                isSelected
                                  ? "bg-[#1b1938] text-[#ffffff] border-[#1b1938]"
                                  : "bg-[#ffffff] text-[#9a9794] border-[#e8e4dd]"
                              )}
                            >
                              <Icon className="size-5" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[16px] font-[460] text-[#292827]">
                                {goal.title}
                              </div>
                              <div className="mt-0.5 text-[14px] font-[460] leading-[1.4] text-[#73706d]">
                                {goal.desc}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1b1938]">
                                <Check className="size-4 text-[#ffffff]" aria-hidden="true" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="space-y-4 pt-2">
                      <Button
                        type="submit"
                        disabled={!selectedGoal}
                        className="h-[44px] w-full rounded-md bg-[#1b1938] text-[16px] font-[700] text-[#ffffff] hover:bg-[#0e0c1f] disabled:opacity-50"
                      >
                        Continue
                        <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                      </Button>
                      <p className="flex items-center justify-center gap-2 text-[14px] font-[460] text-[#9a9794]">
                        <Lock className="size-3.5" aria-hidden="true" />
                        You can change this later
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Success step */}
              {step === "success" && (
                <div className="relative rounded-xl border border-[#e8e4dd] bg-[#ffffff] p-6 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <div className="mb-6 flex justify-center animate-fade-up">
                    <div className="flex items-center gap-2 rounded-full border border-[#e8e4dd] bg-[#fafaf8] px-3 py-1.5 text-[12px] font-[540] text-[#73706d]">
                      <div className="size-2 rounded-full bg-[#1b1938]" aria-hidden="true" />
                      All set
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-8 animate-fade-up">
                    <div className="relative flex size-[88px] items-center justify-center">
                      <div className="relative flex size-[72px] items-center justify-center rounded-full border-[2px] border-[#1b1938] bg-[#fafaf8]">
                        <Check className="size-8 text-[#1b1938]" aria-hidden="true" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="space-y-3 text-center">
                      <DialogPrimitive.Title className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-[#292827]">
                        You&apos;re on the list
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-[340px] space-y-4 text-[16px] font-[460] leading-[1.5] text-[#73706d]">
                        <p>We&apos;ve reserved your spot for {selectedGoal || planName}.</p>
                        <p>
                          We&apos;ll email you at{" "}
                          <strong className="font-[700] text-[#292827]">{email}</strong>{" "}
                          when your workspace is ready.
                        </p>
                      </DialogPrimitive.Description>
                    </div>

                    <div className="w-full space-y-6">
                      <div className="flex w-full items-center gap-4 rounded-md border border-[#e8e4dd] bg-[#fafaf8] p-4 text-left">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-[#e8e4dd] bg-[#ffffff] text-[#292827]">
                          <Mail className="size-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[16px] font-[460] text-[#292827]">
                            Waitlist confirmed
                          </div>
                          <div className="mt-0.5 text-[14px] font-[460] text-[#73706d]">
                            You&apos;ll be one of the first to get access.
                          </div>
                        </div>
                        <div className="rounded-xs border border-[#e8e4dd] bg-[#ffffff] px-2.5 py-1 text-[12px] font-[540] text-[#292827]">
                          {selectedGoal || planName} Access
                        </div>
                      </div>

                      <div className="space-y-4">
                        <DialogPrimitive.Close asChild>
                          <Button
                            className="h-[44px] w-full rounded-md bg-[#1b1938] text-[16px] font-[700] text-[#ffffff] hover:bg-[#0e0c1f]"
                            type="button"
                          >
                            Done
                          </Button>
                        </DialogPrimitive.Close>
                        
                        <div className="text-center">
                          <DialogPrimitive.Close className="inline-flex items-center gap-2 text-[14px] font-[460] text-[#73706d] transition-colors hover:text-[#292827] focus-visible:outline-none">
                            <ArrowLeft className="size-3.5" aria-hidden="true" />
                            Back to site
                          </DialogPrimitive.Close>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
