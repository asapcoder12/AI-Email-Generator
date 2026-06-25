"use client";

import { ArrowRight, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#benefits", label: "Benefits" },
  { href: "/#faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
];

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

export function SiteHeader({ variant = "light" }: SiteHeaderProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl",
        isDark
          ? "border-white/10 bg-primary/90 text-primary-foreground"
          : "border-border bg-background/90 text-foreground",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-md",
              isDark ? "bg-accent text-primary" : "bg-primary text-white",
            )}
          >
            <Mail className="size-4" />
          </span>
          <span>AI Email Generator</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "text-sm font-medium transition-colors",
                isDark
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant={isDark ? "ghost" : "outline"}>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild variant={isDark ? "hero" : "default"}>
            <Link href="/signup">
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation"
              className={cn(isDark && "text-white hover:bg-white/10")}
              size="icon"
              variant="ghost"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>AI Email Generator</SheetTitle>
              <SheetDescription>
                Create polished emails from a short topic brief.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 grid gap-3">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    className="rounded-md px-2 py-3 text-base font-semibold hover:bg-secondary"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              <SheetClose asChild>
                <Button asChild variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
