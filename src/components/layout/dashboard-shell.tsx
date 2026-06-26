"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  AppSidebar,
  DashboardNavLink,
  dashboardLinks,
  isActiveLink,
} from "./app-sidebar";
import { LogoutButton } from "./logout-button";

type DashboardShellProps = {
  children: ReactNode;
  savedDrafts: number;
  userEmail: string;
  wordsGenerated?: number;
};

export function DashboardShell({
  children,
  savedDrafts,
  userEmail,
  wordsGenerated = 1248,
}: DashboardShellProps) {
  const pathname = usePathname();
  const formattedWords = new Intl.NumberFormat("en-US").format(wordsGenerated);

  return (
    <div className="dashboard-shell">
      <AppSidebar
        formattedWords={formattedWords}
        pathname={pathname}
        savedDrafts={savedDrafts}
        userEmail={userEmail}
      />

      <div className="dashboard-content">
        <header className="dashboard-mobile-header">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4">
            <Link
              className="flex min-w-0 items-center gap-2 font-semibold"
              href="/dashboard"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Mail className="size-4" aria-hidden="true" />
              </span>
              <span className="truncate">AI Email Generator</span>
            </Link>
            <LogoutButton className="px-3" size="sm" variant="outline" />
          </div>
          <nav aria-label="Dashboard navigation" className="dashboard-mobile-nav">
            {dashboardLinks.map((link) => (
              <DashboardNavLink
                compact
                isActive={isActiveLink(pathname, link)}
                key={link.label}
                link={link}
              />
            ))}
          </nav>
        </header>

        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}
