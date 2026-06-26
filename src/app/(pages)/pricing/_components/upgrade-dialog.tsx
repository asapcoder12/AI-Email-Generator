"use client";

import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import { FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UpgradeDialogProps = {
  ctaLabel: string;
  planName: string;
};

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

export function UpgradeDialog({ ctaLabel, planName }: UpgradeDialogProps) {
  const emailInputId = useId();
  const emailErrorId = `${emailInputId}-error`;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateEmail(email);

    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setEmailError(null);
    setSubmitted(true);
  }

  function handleOpenChange(open: boolean) {
    if (open) {
      return;
    }

    setEmail("");
    setEmailError(null);
    setSubmitted(false);
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="h-12 w-full rounded-md"
          variant={planName === "Pro" ? "accent" : "default"}
        >
          {ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[486px] gap-0 overflow-hidden p-6 sm:w-[486px] sm:p-8">
        {submitted ? (
          <div className="grid gap-6 pr-8">
            <DialogHeader className="gap-4 text-left">
              <span className="flex size-12 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#7c3aed_0%,#4f2ee8_100%)] text-white shadow-[0_14px_28px_rgba(89,59,232,0.28)]">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </span>
              <div>
                <DialogTitle className="text-[22px] font-bold leading-7 text-[#0b0d2e]">
                  Upgrade request received
                </DialogTitle>
                <DialogDescription className="mt-2 text-[15px] leading-6 text-[#575a76]">
                  Stripe checkout is not integrated in this MVP. We received
                  your request and will use this email for the demo follow-up.
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="rounded-[12px] border border-[#e8e4dd] bg-[#faf9ff] px-4 py-3 text-sm leading-6 text-[#464a70]">
              Confirmation email:{" "}
              <span className="font-semibold text-[#111438]">{email}</span>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  className="h-12 w-full rounded-md bg-[#5b2ee8] text-base font-bold text-white hover:bg-[#4a24c9]"
                  type="button"
                >
                  Done
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <form className="grid gap-7" onSubmit={handleSubmit} noValidate>
            <DialogHeader className="grid grid-cols-[48px_1fr] gap-x-5 gap-y-0 pr-8 text-left">
              <span className="relative flex size-12 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#7c3aed_0%,#4f2ee8_100%)] text-white shadow-[0_14px_28px_rgba(89,59,232,0.28)]">
                <Sparkles className="size-6" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#efeaff] text-[#6d55ff]"
                >
                  <Sparkles className="size-3" />
                </span>
              </span>
              <div>
                <DialogTitle className="text-[22px] font-bold leading-7 text-[#0b0d2e]">
                  Upgrade to Pro
                </DialogTitle>
                <DialogDescription className="mt-2 text-[15px] leading-6 text-[#575a76]">
                  Enter your work email to continue with the upgrade process.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="grid gap-2">
              <Label
                className="text-[15px] font-bold leading-5 text-[#111438]"
                htmlFor={emailInputId}
              >
                Work email
              </Label>
              <Input
                aria-describedby={emailError ? emailErrorId : undefined}
                aria-invalid={Boolean(emailError)}
                autoFocus
                className="h-12 rounded-lg border-[#e8e4dd] bg-white px-4 text-base text-[#111438] shadow-[0_0_0_3px_rgba(124,58,237,0.08)] placeholder:text-[#777a94] focus-visible:ring-[#8b5cf6]"
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
              />
              {emailError ? (
                <p
                  className="text-sm font-medium leading-5 text-destructive"
                  id={emailErrorId}
                  role="alert"
                >
                  {emailError}
                </p>
              ) : null}
            </div>

            <div className="grid gap-5">
              <Button
                className="h-12 w-full rounded-md bg-[linear-gradient(135deg,#6d28d9_0%,#4f2ee8_100%)] text-base font-bold text-white shadow-[0_14px_26px_rgba(89,59,232,0.22)] hover:bg-[#4f2ee8]"
                type="submit"
              >
                <Mail className="size-5" aria-hidden="true" />
                Continue upgrade
              </Button>

              <p className="flex items-center justify-center gap-3 text-center text-[15px] leading-6 text-[#666982]">
                <Lock className="size-4 shrink-0" aria-hidden="true" />
                We&apos;ll send a confirmation link to your email.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
