import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { countGeneratedEmails } from "@/lib/supabase/data";
import {
  createSupabaseServerClient,
  getAuthenticatedClaims,
  getClaimEmail,
} from "@/lib/supabase/server";

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

  const userId = typeof claims.sub === "string" ? claims.sub : "";
  let savedDrafts = 0;

  if (userId) {
    try {
      const supabase = await createSupabaseServerClient();
      savedDrafts = await countGeneratedEmails(supabase, userId);
    } catch (error) {
      console.error("Generated email count could not be loaded", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <DashboardShell savedDrafts={savedDrafts} userEmail={getClaimEmail(claims)}>
      {children}
    </DashboardShell>
  );
}
