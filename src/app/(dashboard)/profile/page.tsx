import {
  countGeneratedEmails,
  ensureProfileForClaims,
} from "@/lib/supabase/data";
import {
  createSupabaseServerClient,
  getAuthenticatedClaims,
  getClaimEmail,
} from "@/lib/supabase/server";
import { AccountDetailsCard } from "./_components/account-details-card";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileSummaryCards } from "./_components/profile-summary-cards";
import { SecurityNote } from "./_components/security-note";

const FALLBACK_EMAIL = "sam@mail.com";
const FALLBACK_PLAN = "Free plan";
const FALLBACK_SAVED_DRAFTS = 4;
const FALLBACK_SUBJECT = "24a0cafd-3df9-40dc-917d-a10d7337567b";

function resolveEmail(
  profileEmail: string | undefined,
  claimsEmail: string,
): string {
  if (profileEmail && profileEmail.length > 0) {
    return profileEmail;
  }

  if (
    claimsEmail.length > 0 &&
    claimsEmail !== "Signed-in user"
  ) {
    return claimsEmail;
  }

  return FALLBACK_EMAIL;
}

function resolvePlanLabel(plan: string | undefined): string {
  if (!plan || plan.length === 0) {
    return FALLBACK_PLAN;
  }

  return `${plan.charAt(0).toUpperCase()}${plan.slice(1)} plan`;
}

export default async function ProfilePage() {
  const claims = await getAuthenticatedClaims();
  let profile = null;
  let generatedCount = FALLBACK_SAVED_DRAFTS;

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

  const email = resolveEmail(profile?.email, getClaimEmail(claims));
  const planLabel = resolvePlanLabel(profile?.plan);
  const subject =
    typeof claims?.sub === "string" && claims.sub.length > 0
      ? claims.sub
      : FALLBACK_SUBJECT;

  return (
    <div className="grid gap-8 lg:gap-10">
      <ProfileHeader />
      <ProfileSummaryCards
        email={email}
        planLabel={planLabel}
        savedDrafts={generatedCount}
      />
      <AccountDetailsCard subject={subject} />
      <SecurityNote />
    </div>
  );
}
