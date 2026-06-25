import { Mail, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "./logout-button";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail: string;
};

const dashboardLinks = [
  { href: "/dashboard", label: "Generator" },
  { href: "/profile", label: "Profile" },
  { href: "/pricing", label: "Pricing" },
];

export function DashboardShell({ children, userEmail }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b bg-background">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
              <Mail className="size-4" />
            </span>
            <span>AI Email Generator</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            {dashboardLinks.map((link) => (
              <Button asChild key={link.href} size="sm" variant="ghost">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-lg border bg-background p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-secondary">
              <User className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{userEmail}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Free workspace
              </p>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="space-y-3">
            <Badge variant="accent">Mock AI active</Badge>
            <p className="text-sm leading-6 text-muted-foreground">
              Generation is local and deterministic for the MVP, so no paid AI
              API calls are made.
            </p>
          </div>
        </aside>
        <section>{children}</section>
      </main>
    </div>
  );
}
