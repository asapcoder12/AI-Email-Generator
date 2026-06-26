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
import { LogoutButton } from "./logout-button";

const navLinks = [
  { href: "/#benefits", label: "Benefits" },
  { href: "/#faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
];

type SiteHeaderProps = {
  activeHref?: string;
  isAuthenticated?: boolean;
  primaryCtaLabel?: string;
  showPublicSignIn?: boolean;
  variant?: "dark" | "light";
};

export function SiteHeader({
  activeHref,
  isAuthenticated = false,
  primaryCtaLabel = "Get started",
  showPublicSignIn = true,
  variant = "light",
}: SiteHeaderProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        isDark
          ? "border-hairline-dark bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground",
      )}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="flex min-h-11 min-w-0 items-center gap-3 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          href="/"
        >
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-md",
              isDark ? "bg-accent text-primary" : "bg-primary text-primary-foreground",
            )}
          >
            <Mail className="size-4" aria-hidden="true" />
          </span>
          <span className="truncate">AI Email Generator</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex h-[72px] items-center text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isDark
                    ? "text-on-dark-mute hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  isActive &&
                    cn(
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full",
                      isDark
                        ? "text-primary-foreground after:bg-accent"
                        : "text-foreground after:bg-primary",
                    ),
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Button
                asChild
                className={cn("px-6", isDark && "text-primary")}
                variant={isDark ? "hero" : "default"}
              >
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <LogoutButton
                className={cn(isDark && "text-primary-foreground hover:bg-primary-deep")}
                variant={isDark ? "ghost" : "outline"}
              />
            </>
          ) : (
            <>
              {showPublicSignIn ? (
                <Button
                  asChild
                  className={cn(
                    "px-5",
                    isDark && "text-on-dark-mute hover:bg-primary-deep hover:text-primary-foreground",
                  )}
                  variant={isDark ? "ghost" : "outline"}
                >
                  <Link href="/login">Sign in</Link>
                </Button>
              ) : null}
              <Button asChild className="px-6" variant={isDark ? "hero" : "default"}>
                <Link href="/signup">
                  {primaryCtaLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation"
              className={cn("ml-auto shrink-0 md:hidden", isDark && "text-primary-foreground hover:bg-primary-deep")}
              size="icon"
              variant="ghost"
            >
              <Menu className="size-5" aria-hidden="true" />
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
                    aria-current={activeHref === link.href ? "page" : undefined}
                    className={cn(
                      "rounded-md px-2 py-3 text-base font-semibold hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeHref === link.href && "bg-secondary text-primary",
                    )}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {isAuthenticated ? (
                <>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </SheetClose>
                  <LogoutButton />
                </>
              ) : (
                <>
                  {showPublicSignIn ? (
                    <SheetClose asChild>
                      <Button asChild variant="outline">
                        <Link href="/login">Sign in</Link>
                      </Button>
                    </SheetClose>
                  ) : null}
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/signup">{primaryCtaLabel}</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
