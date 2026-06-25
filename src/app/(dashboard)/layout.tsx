import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getAuthenticatedClaims, getClaimEmail } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const claims = await getAuthenticatedClaims();

  if (!claims) {
    redirect("/login");
  }

  return (
    <DashboardShell userEmail={getClaimEmail(claims)}>{children}</DashboardShell>
  );
}
