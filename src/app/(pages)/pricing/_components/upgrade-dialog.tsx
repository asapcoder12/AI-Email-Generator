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
  { id: "speed", icon: Zap, title: "Personal speed", desc: "Generate polished drafts faster with higher quality." },
  { id: "team", icon: Users, title: "Team collaboration", desc: "Share prompts, workflows, and a unified voice across the team." },
  { id: "api", icon: Target, title: "Advanced usage", desc: "Scale with API access and custom integrations." },
];

const TOTAL_STEPS = 3;

export function UpgradeDialog({ ctaLabel, planName }: UpgradeDialogProps) {
  const emailInputId = useId();
  const emailErrorId = `${emailInputId}-error`;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const currentStepNumber = step === "email" ? 1 : step === "goals" ? 2 : 3;

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      // reset state after animation completes
      setTimeout(() => {
        setStep("email");
        setEmail("");
        setEmailError(null);
        setSelectedGoal(null);
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
        {/* Fullscreen background overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-[#0B0A1A] data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: "url('/images/get-invite-bg.png')" }}
          />
          {/* Dimming layer to make background less bright */}
          <div className="absolute inset-0 bg-black/40" />
        </DialogPrimitive.Overlay>

        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-[100] flex flex-col overflow-y-auto data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
          )}
        >

          {/* Top Navigation Bar */}
          <div className="relative z-10 flex w-full flex-none items-center justify-end p-6 sm:p-8">
            <DialogPrimitive.Close className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Centered Modal Card */}
          <div className="relative z-10 flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-[480px] animate-enter">
              {/* Email step */}
              {step === "email" && (
                <div className="relative rounded-[36px] border border-[#b794ff]/75 bg-[#0b0920]/70 p-6 sm:p-10 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(139,92,246,0.14)] before:absolute before:inset-0 before:-z-10 before:rounded-[36px] before:shadow-[0_0_50px_rgba(139,92,246,0.55)]">
                  <div className="mb-6 flex justify-center animate-fade-up">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] font-[500] text-white/80">
                      <div className="size-2 rounded-full bg-[#C4A1FF]" aria-hidden="true" />
                      Step 1 of 3
                    </div>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-8 animate-fade-up" noValidate>
                    <div className="space-y-3 text-center">
                      <div className="text-[11px] font-[700] tracking-[0.15em] text-[#C4A1FF]">
                        GET EARLY ACCESS
                      </div>
                      <DialogPrimitive.Title className="text-[32px] font-[600] leading-[1.1] tracking-[-0.02em] text-white sm:text-[36px]">
                        Get your Pro invite
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-[340px] text-[15px] font-[460] leading-[1.5] text-white/60">
                        We manually onboard teams to maintain the highest quality experience.
                      </DialogPrimitive.Description>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label
                          className="text-[14px] font-[500] text-white/90"
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
                          className="h-12 border-white/10 bg-black/20 text-base text-white placeholder:text-white/30 focus-visible:ring-[#C4A1FF] focus-visible:ring-offset-0 sm:h-14"
                        />
                        {emailError && (
                          <p
                            className="mt-2 text-[13px] font-[500] text-red-400"
                            id={emailErrorId}
                            role="alert"
                          >
                            {emailError}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4 pt-2">
                        <Button
                          className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-400 to-purple-400 text-[15px] font-semibold text-[#160b2e] hover:opacity-90 sm:h-14"
                          type="submit"
                        >
                          Request Pro Access
                          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                        </Button>

                        <p className="flex items-center justify-center gap-2 text-[13px] font-[460] text-white/50">
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
                <div className="relative rounded-[36px] border border-[#b794ff]/75 bg-[#0b0920]/70 p-6 sm:p-10 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(139,92,246,0.14)] before:absolute before:inset-0 before:-z-10 before:rounded-[36px] before:shadow-[0_0_50px_rgba(139,92,246,0.55)]">
                  <div className="mb-6 flex justify-center animate-fade-up">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] font-[500] text-white/80">
                      <div className="size-2 rounded-full bg-[#C4A1FF]" aria-hidden="true" />
                      Step 2 of 3
                    </div>
                  </div>

                  <form onSubmit={handleGoalsSubmit} className="space-y-8 animate-fade-up">
                    <div className="space-y-3 text-center">
                      <div className="text-[11px] font-[700] tracking-[0.15em] text-[#C4A1FF]">
                        CUSTOMIZE YOUR EXPERIENCE
                      </div>
                      <DialogPrimitive.Title className="text-[32px] font-[600] leading-[1.1] tracking-[-0.02em] text-white sm:text-[36px]">
                        What should Pro help you with first?
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-[340px] text-[15px] font-[460] leading-[1.5] text-white/60">
                        We customize your onboarding so you get value faster.
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
                              "group relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                              isSelected
                                ? "border-[#C4A1FF]/50 bg-[#C4A1FF]/10"
                                : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/40"
                            )}
                            aria-pressed={isSelected}
                          >
                            <div
                              className={cn(
                                "flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                                isSelected
                                  ? "bg-[#C4A1FF] text-[#0C0C16]"
                                  : "bg-white/5 text-white/70 group-hover:bg-white/10"
                              )}
                            >
                              <Icon className="size-5" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[15px] font-[600] text-white">
                                {goal.title}
                              </div>
                              <div className="mt-0.5 text-[13px] font-[460] leading-[1.4] text-white/60">
                                {goal.desc}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#C4A1FF]">
                                <Check className="size-4 text-[#0C0C16]" aria-hidden="true" />
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
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-400 to-purple-400 text-[15px] font-semibold text-[#160b2e] hover:opacity-90 disabled:opacity-50 sm:h-14"
                      >
                        Continue
                        <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                      </Button>
                      <p className="flex items-center justify-center gap-2 text-[13px] font-[460] text-white/50">
                        <Lock className="size-3.5" aria-hidden="true" />
                        You can change this later
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Success step */}
              {step === "success" && (
                <div className="relative rounded-[36px] border border-[#b794ff]/75 bg-[#0b0920]/70 p-6 sm:p-10 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(139,92,246,0.14)] before:absolute before:inset-0 before:-z-10 before:rounded-[36px] before:shadow-[0_0_50px_rgba(139,92,246,0.55)]">
                  <div className="mb-6 flex justify-center animate-fade-up">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] font-[500] text-white/80">
                      <div className="size-2 rounded-full bg-[#C4A1FF]" aria-hidden="true" />
                      All set
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-8 animate-fade-up">
                    <div className="relative flex size-[88px] items-center justify-center">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-[#C4A1FF]/20 blur-xl" />
                      <div className="relative flex size-[72px] items-center justify-center rounded-full border-[3px] border-[#C4A1FF] bg-[#C4A1FF]/10">
                        <Check className="size-8 text-[#C4A1FF]" aria-hidden="true" strokeWidth={3} />
                      </div>
                    </div>

                    <div className="space-y-3 text-center">
                      <DialogPrimitive.Title className="text-[32px] font-[600] leading-[1.1] tracking-[-0.02em] text-white sm:text-[36px]">
                        You're on the list
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mx-auto max-w-[340px] space-y-4 text-[15px] font-[460] leading-[1.5] text-white/60">
                        <p>We've reserved your spot for Pro.</p>
                        <p>
                          We'll email you at{" "}
                          <strong className="font-[500] text-[#C4A1FF]">{email}</strong>{" "}
                          when your workspace is ready.
                        </p>
                      </DialogPrimitive.Description>
                    </div>

                    <div className="w-full space-y-6">
                      <div className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70">
                          <Mail className="size-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] font-[600] text-white">
                            Waitlist confirmed
                          </div>
                          <div className="mt-0.5 text-[13px] font-[460] text-white/60">
                            You'll be one of the first to get access.
                          </div>
                        </div>
                        <div className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-[600] text-white/70">
                          Pro Access
                        </div>
                      </div>

                      <div className="space-y-4">
                        <DialogPrimitive.Close asChild>
                          <Button
                            className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-400 to-purple-400 text-[15px] font-semibold text-[#160b2e] hover:opacity-90 sm:h-14"
                            type="button"
                          >
                            Done
                          </Button>
                        </DialogPrimitive.Close>
                        
                        <div className="text-center">
                          <DialogPrimitive.Close className="inline-flex items-center gap-2 text-[14px] font-[500] text-white/60 transition-colors hover:text-white focus-visible:outline-none">
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
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
