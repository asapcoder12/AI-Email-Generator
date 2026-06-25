"use client";

import { ArrowRight, CheckCircle2, CreditCard } from "lucide-react";
import { FormEvent, useState } from "react";
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

export function UpgradeDialog({ ctaLabel, planName }: UpgradeDialogProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Dialog onOpenChange={(open) => !open && setSubmitted(false)}>
      <DialogTrigger asChild>
        <Button
          className="h-12 w-full rounded-md"
          variant={planName === "Pro" ? "accent" : "default"}
        >
          {ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <>
            <DialogHeader>
              <span className="flex size-12 items-center justify-center rounded-md bg-secondary text-primary">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </span>
              <DialogTitle>Upgrade request received</DialogTitle>
              <DialogDescription>
                Your upgrade request has been received. Our team will reach
                out with next steps to activate your plan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Done</Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Upgrade to {planName}</DialogTitle>
              <DialogDescription>
                Enter your work email to continue with the upgrade process.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor={`upgrade-email-${planName}`}>Work email</Label>
              <Input
                id={`upgrade-email-${planName}`}
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                <CreditCard className="size-4" aria-hidden="true" />
                Continue upgrade
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
