"use client";

import {
  Diamond,
  FileText,
  LayoutDashboard,
  Mail,
  PenLine,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";

export type DashboardLink = {
  href: string;
  icon: LucideIcon;
  label: string;
  match?: string;
};

export const dashboardLinks: DashboardLink[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", match: "/dashboard" },
  { href: "/dashboard#generator", icon: PenLine, label: "Generate" },
  { href: "/dashboard#recent-drafts", icon: FileText, label: "Drafts" },
  { href: "/profile", icon: UserRound, label: "Profile", match: "/profile" },
];

type AppSidebarProps = {
  formattedWords: string;
  pathname: string;
  savedDrafts: number;
  userEmail: string;
};

export function AppSidebar({
  formattedWords,
  pathname,
  savedDrafts,
  userEmail,
}: AppSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <Link
        className="flex items-center gap-3 text-lg font-semibold leading-none"
        href="/dashboard"
      >
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <span>AI Email Generator</span>
      </Link>

      <nav aria-label="Dashboard navigation" className="mt-10 grid gap-2">
        {dashboardLinks.map((link) => (
          <DashboardNavLink
            isActive={isActiveLink(pathname, link)}
            key={link.label}
            link={link}
          />
        ))}
      </nav>

      <section className="mt-9 rounded-xl border border-accent/50 bg-accent/15 p-5">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent/35 text-primary">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-base font-semibold">Upgrade to Pro</h2>
        <p className="mt-3 text-sm leading-6 text-primary/80">
          Unlock unlimited drafts, priority support, and advanced features.
        </p>
        <Button asChild className="mt-5 w-full" size="sm">
          <Link href="/pricing">Upgrade plan</Link>
        </Button>
      </section>

      <div className="mt-8 border-t pt-6">
        <Button
          asChild
          className="w-full justify-start px-3 text-sm font-medium"
          variant="ghost"
        >
          <Link href="/pricing">
            <Diamond className="size-4" aria-hidden="true" />
            Upgrade plan
          </Link>
        </Button>
        <LogoutButton
          className="mt-2 w-full justify-start px-3 text-sm font-medium"
          variant="ghost"
        />
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

function SummaryRow({
  label,
  value,
  valueKind = "text",
}: {
  label: string;
  value: string;
  valueKind?: "badge" | "text";
}) {
  return (
    <div className="flex min-h-9 items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      {valueKind === "badge" ? (
        <span className="rounded-full bg-accent/35 px-3 py-1 text-xs font-semibold text-primary">
          {value}
        </span>
      ) : (
        <span className="font-semibold tabular-nums">{value}</span>
      )}
    </div>
  );
}

function isActiveLink(pathname: string, link: DashboardLink) {
  return Boolean(link.match && pathname === link.match);
}

export { DashboardNavLink, isActiveLink };
