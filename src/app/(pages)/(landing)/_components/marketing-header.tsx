"use client";

import { ArrowRight, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/layout/logout-button";
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

const navLinks = [
  { href: "/#benefits", label: "Benefits" },
  { href: "/#faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
];

type MarketingHeaderProps = {
  isAuthenticated?: boolean;
};

export function MarketingHeader({
  isAuthenticated = false,
}: MarketingHeaderProps) {
  return (
    <header className="relative z-30 text-primary-foreground">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          className="flex min-h-11 items-center gap-3 text-base font-[540] text-primary-foreground"
          href="/"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
            <Mail className="size-4" aria-hidden="true" />
          </span>
          <span>AI Email Generator</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              className="text-base font-[460] text-on-dark-mute transition-colors duration-200 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <>
              <Button
                asChild
                className="px-6"
                variant="hero"
              >
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <LogoutButton
                className="text-on-dark-mute hover:bg-accent/15 hover:text-primary-foreground"
                variant="ghost"
              />
            </>
          ) : (
            <>
              <Link
                className="text-base font-[460] text-on-dark-mute transition-colors duration-200 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href="/login"
              >
                Sign in
              </Link>
              <Button
                asChild
                className="px-6"
                variant="hero"
              >
                <Link href="/signup">Get started free</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation"
              className="text-primary-foreground hover:bg-accent/15 md:hidden"
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
            <div className="mt-8 grid gap-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    className="rounded-md px-2 py-3 text-base font-[460] hover:bg-secondary"
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
                  <SheetClose asChild>
                    <Button asChild variant="outline">
                      <Link href="/login">Sign in</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/signup">Get started free</Link>
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
