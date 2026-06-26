"use client";

import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
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
      <DialogContent className="max-w-[448px] gap-0 overflow-hidden p-6 sm:p-8">
        {submitted ? (
          <div className="grid gap-6 pr-12">
            <DialogHeader className="gap-4 text-left">
              <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </span>
              <div>
                <DialogTitle className="text-[22px] font-[460] leading-[1.1] text-foreground">
                  Upgrade request received
                </DialogTitle>
                <DialogDescription className="mt-2 text-base leading-6 text-muted-foreground">
                  Stripe checkout is not integrated in this MVP. We received
                  your request and will use this email for the demo follow-up.
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm leading-6 text-muted-foreground">
              Confirmation email:{" "}
              <span className="font-semibold text-foreground">{email}</span>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  className="h-12 w-full text-base font-bold"
                  type="button"
                >
                  Done
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
            <DialogHeader className="pr-12 text-left">
              <div>
                <DialogTitle className="text-[22px] font-[460] leading-[1.1] text-foreground">
                  Upgrade to {planName}
                </DialogTitle>
                <DialogDescription className="mt-2 text-base leading-6 text-muted-foreground">
                  Enter your work email to continue with the upgrade process.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="grid gap-2">
              <Label
                className="text-base font-bold leading-5 text-foreground"
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
                className="w-full"
                type="submit"
              >
                <Mail className="size-5" aria-hidden="true" />
                Continue upgrade
              </Button>

              <p className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
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
