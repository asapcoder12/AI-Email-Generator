import { DashboardGenerator } from "./_components/dashboard-generator";
import { listGeneratedEmails } from "@/lib/supabase/data";
import {
  createSupabaseServerClient,
  getAuthenticatedClaims,
} from "@/lib/supabase/server";
import type { EmailHistoryItem } from "@/types/database";

export default async function DashboardPage() {
  const claims = await getAuthenticatedClaims();
  const userId = typeof claims?.sub === "string" ? claims.sub : "";
  let initialHistory: EmailHistoryItem[] = [];

  if (userId) {
    try {
      const supabase = await createSupabaseServerClient();
      initialHistory = await listGeneratedEmails(supabase, userId, 5);
    } catch (error) {
      console.error("Generated email history could not be loaded", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return <DashboardGenerator initialHistory={initialHistory} />;
}
