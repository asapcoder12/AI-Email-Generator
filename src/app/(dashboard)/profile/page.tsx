import {
  countGeneratedEmails,
  ensureProfileForClaims,
} from "@/lib/supabase/data";
import {
  createSupabaseServerClient,
  getAuthenticatedClaims,
  getClaimEmail,
} from "@/lib/supabase/server";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileSummaryCards } from "./_components/profile-summary-cards";

const FALLBACK_EMAIL = "sam@mail.com";
const FALLBACK_PLAN = "Free plan";
const FALLBACK_SAVED_DRAFTS = 4;

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

  return (
    <div>
      <ProfileHeader />
      <div className="mt-10">
        <ProfileSummaryCards
          email={email}
          planLabel={planLabel}
          savedDrafts={generatedCount}
        />
      </div>
    </div>
  );
}
