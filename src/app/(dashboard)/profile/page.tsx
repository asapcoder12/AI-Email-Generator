import { CalendarDays, MailCheck, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  countGeneratedEmails,
  ensureProfileForClaims,
} from "@/lib/supabase/data";
import {
  createSupabaseServerClient,
  getAuthenticatedClaims,
  getClaimEmail,
} from "@/lib/supabase/server";

export default async function ProfilePage() {
  const claims = await getAuthenticatedClaims();
  let profile = null;
  let generatedCount = 0;

  if (claims) {
    try {
      const supabase = await createSupabaseServerClient();
      profile = await ensureProfileForClaims(supabase, claims);

      if (profile) {
        generatedCount = await countGeneratedEmails(supabase, profile.id);
      }
    } catch (error) {
      console.error("Profile data could not be loaded", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  const email = profile?.email ?? getClaimEmail(claims);
  const planLabel = profile
    ? `${profile.plan.charAt(0).toUpperCase()}${profile.plan.slice(1)} plan`
    : "Free MVP";
  const subject =
    typeof claims?.sub === "string" ? claims.sub : "Supabase authenticated user";

  return (
    <Card>
      <CardHeader>
        <Badge className="w-fit" variant="accent">
          Profile
        </Badge>
        <CardTitle className="text-3xl">Account profile</CardTitle>
        <CardDescription>
          A minimal account surface backed by Supabase Auth and app data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-md border bg-secondary p-5">
            <UserCircle className="size-6 text-primary" />
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Email
            </p>
            <p className="mt-1 break-words text-lg font-semibold">{email}</p>
          </div>
          <div className="rounded-md border bg-secondary p-5">
            <CalendarDays className="size-6 text-primary" />
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Plan
            </p>
            <p className="mt-1 text-lg font-semibold">{planLabel}</p>
          </div>
          <div className="rounded-md border bg-secondary p-5">
            <MailCheck className="size-6 text-primary" />
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Saved drafts
            </p>
            <p className="mt-1 text-lg font-semibold">{generatedCount}</p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="rounded-md border bg-background p-5">
          <p className="text-sm font-semibold text-muted-foreground">
            Supabase subject
          </p>
          <p className="mt-2 break-all font-mono text-sm">{subject}</p>
        </div>
      </CardContent>
    </Card>
  );
}
