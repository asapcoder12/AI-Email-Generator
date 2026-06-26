"use client";

import {
  ArrowRight,
  Home,
  Mail,
  MailCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";

export type DashboardLink = {
  href: string;
  icon: LucideIcon;
  label: string;
  match?: string;
};

export const dashboardLinks: DashboardLink[] = [
  { href: "/dashboard", icon: Home, label: "Home", match: "/dashboard" },
  { href: "/dashboard#recent-drafts", icon: MailCheck, label: "Drafts" },
];

type AppSidebarProps = {
  formattedWords: string;
  pathname: string;
  savedDrafts: number;
  userEmail: string;
};

export function AppSidebar({
  pathname,
  userEmail,
}: AppSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <Link
        className="flex items-center gap-5 px-2 text-[22px] font-[460] leading-[1.1] tracking-[-0.315px] text-foreground"
        href="/dashboard"
      >
        <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[var(--shadow-elev-1)]">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <span>AI Email Generator</span>
      </Link>

      <nav aria-label="Dashboard navigation" className="mt-14 grid gap-3">
        {dashboardLinks.map((link) => (
          <DashboardNavLink
            isActive={isActiveLink(pathname, link)}
            key={link.label}
            link={link}
          />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <section className="mx-2 rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-elev-1)]">
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-base font-[700] text-foreground">
            Upgrade your plan
          </h2>
          <p className="mt-4 text-base leading-6 text-muted-foreground">
            Unlock premium features and higher limits.
          </p>
          <Button
            asChild
            className="mt-5 w-full text-sm"
            size="sm"
            variant="default"
          >
            <Link href="/pricing">
              View plans
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>

        <div className="mx-2 mb-4 mt-2">
          <UserMenu userEmail={userEmail} />
        </div>
      </div>
    </aside>
  );
}

function DashboardNavLink({
  compact = false,
  isActive,
  link,
}: {
  compact?: boolean;
  isActive: boolean;
  link: DashboardLink;
}) {
  const Icon = link.icon;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "dashboard-nav-link",
        compact ? "dashboard-nav-link--compact" : "dashboard-nav-link--desktop",
        isActive && "dashboard-nav-link--active",
      )}
      href={link.href}
    >
      <Icon className="size-5" aria-hidden="true" />
      <span>{link.label}</span>
    </Link>
  );
}

function isActiveLink(pathname: string, link: DashboardLink) {
  return Boolean(link.match && pathname === link.match);
}

export { DashboardNavLink, isActiveLink };

