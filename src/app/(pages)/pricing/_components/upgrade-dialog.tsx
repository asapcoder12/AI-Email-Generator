"use client";

import { CheckCircle2, CreditCard } from "lucide-react";
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
  planName: string;
};

export function UpgradeDialog({ planName }: UpgradeDialogProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Dialog onOpenChange={(open) => !open && setSubmitted(false)}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={planName === "Pro" ? "accent" : "default"}>
          <CreditCard className="size-4" />
          Upgrade
        </Button>
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <>
            <DialogHeader>
              <span className="flex size-12 items-center justify-center rounded-md bg-secondary text-primary">
                <CheckCircle2 className="size-6" />
              </span>
              <DialogTitle>Upgrade request received</DialogTitle>
              <DialogDescription>
                The Stripe integration is intentionally out of scope for this
                release. This flow confirms the intended premium journey and
                can be connected to billing later.
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
                Leave your email to simulate the premium upgrade handoff. No
                payment details are collected in this flow.
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
                <CreditCard className="size-4" />
                Continue upgrade
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
