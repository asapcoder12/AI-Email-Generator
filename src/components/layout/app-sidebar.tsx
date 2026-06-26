"use client";

import {
  ArrowRight,
  LayoutDashboard,
  Mail,
  MailCheck,
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
  { href: "/dashboard#recent-drafts", icon: MailCheck, label: "Drafts" },
  { href: "/profile", icon: UserRound, label: "Profile", match: "/profile" },
];

type AppSidebarProps = {
  formattedWords: string;
  pathname: string;
  savedDrafts: number;
  userEmail: string;
};

export function AppSidebar({
  pathname,
}: AppSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <Link
        className="flex items-center gap-5 px-2 text-[23px] font-bold leading-none text-[#0b0d2e]"
        href="/dashboard"
      >
        <span className="flex size-[38px] items-center justify-center rounded-lg bg-[#080b2f] text-primary-foreground shadow-sm">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <span>AI Email Generator</span>
      </Link>

      <nav aria-label="Dashboard navigation" className="mt-[58px] grid gap-3">
        {dashboardLinks.map((link) => (
          <DashboardNavLink
            isActive={isActiveLink(pathname, link)}
            key={link.label}
            link={link}
          />
        ))}
      </nav>

      <section className="mx-2 mt-auto rounded-lg border border-[#e4e3ec] bg-white p-5 shadow-[0_18px_48px_rgba(20,18,56,0.06)]">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#f0ebff] text-[#3928e8]">
          <Sparkles className="size-[18px]" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-base font-bold text-[#111438]">
          Upgrade your plan
        </h2>
        <p className="mt-4 text-[15px] leading-6 text-[#464a70]">
          Unlock premium features and higher limits.
        </p>
        <Button
          asChild
          className="mt-5 h-11 w-full rounded-md bg-[#f4efff] text-[15px] font-bold text-[#3928e8] shadow-none hover:bg-[#ebe4ff]"
          size="sm"
          variant="ghost"
        >
          <Link href="/pricing">
            View plans
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </section>

      <LogoutButton
        className="mx-2 mt-8 h-11 w-[calc(100%-1rem)] justify-start gap-5 px-2 text-base font-medium text-[#202344] hover:bg-transparent hover:text-[#3928e8] [&_svg]:size-[22px]"
        variant="ghost"
      />
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
      <Icon
        className={compact ? "size-5" : "size-[22px]"}
        aria-hidden="true"
      />
      <span>{link.label}</span>
    </Link>
  );
}

function isActiveLink(pathname: string, link: DashboardLink) {
  return Boolean(link.match && pathname === link.match);
}

export { DashboardNavLink, isActiveLink };
