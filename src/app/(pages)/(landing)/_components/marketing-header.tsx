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
    <header className="relative z-30 text-white">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          className="flex min-h-11 items-center gap-3 text-[17px] font-semibold text-white"
          href="/"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary shadow-[0_8px_22px_rgba(201,180,250,0.34)]">
            <Mail className="size-4" aria-hidden="true" />
          </span>
          <span>AI Email Generator</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              className="text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                className="h-11 rounded-lg px-6 shadow-[0_14px_32px_rgba(201,180,250,0.28)]"
                variant="hero"
              >
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <LogoutButton
                className="border border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
                variant="ghost"
              />
            </>
          ) : (
            <>
              <Link
                className="text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href="/login"
              >
                Sign in
              </Link>
              <Button
                asChild
                className="h-11 rounded-lg px-6 shadow-[0_14px_32px_rgba(201,180,250,0.28)]"
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
              className="md:hidden text-white hover:bg-white/10"
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
                    className="rounded-md px-2 py-3 text-base font-semibold hover:bg-secondary"
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
