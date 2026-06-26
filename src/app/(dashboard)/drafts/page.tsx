import { listGeneratedEmails } from "@/lib/supabase/data";
import {
  createSupabaseServerClient,
  getAuthenticatedClaims,
} from "@/lib/supabase/server";
import type { EmailHistoryItem } from "@/types/database";
import { DraftDialog } from "../_components/draft-dialog";
import { History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DraftsPage() {
  const claims = await getAuthenticatedClaims();
  const userId = typeof claims?.sub === "string" ? claims.sub : "";
  let history: EmailHistoryItem[] = [];

  if (userId) {
    try {
      const supabase = await createSupabaseServerClient();
      // Fetch more items for the dedicated drafts page
      history = await listGeneratedEmails(supabase, userId, 50);
    } catch (error) {
      console.error("Generated email history could not be loaded", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <div className="grid gap-5">
      <header className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
          <History className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="text-[28px] font-[540] leading-[1.14] tracking-[-0.63px] text-foreground sm:text-[48px] sm:font-[460] sm:leading-[0.96] sm:tracking-[-1.32px]">
            All drafts
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-6 text-muted-foreground">
            View all your saved generated emails. Click on a draft to view its full content and copy it.
          </p>
        </div>
      </header>

      <Card className="rounded-lg">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-3 text-[22px] font-[460] leading-[1.1] tracking-[-0.315px]">
              <History className="size-5" aria-hidden="true" />
              Saved drafts
            </CardTitle>
            <CardDescription>
              Your generated emails history.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="overflow-hidden rounded-lg border">
              {history.map((item) => (
                <DraftDialog key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[132px] flex-col items-center justify-center rounded-lg border border-dashed bg-secondary p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-[var(--shadow-elev-1)]">
                <History className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Your saved generated emails will appear here after the first
                successful generation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
