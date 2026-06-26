import { LandingPage } from "./_components/landing-page";
import { getAuthenticatedClaims } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const claims = await getAuthenticatedClaims();

  return <LandingPage isAuthenticated={Boolean(claims)} />;
}
