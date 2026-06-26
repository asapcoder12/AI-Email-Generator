import { redirect } from "next/navigation";
import { AuthForm } from "@/app/(pages)/auth/_components/auth-form";
import { SiteHeader } from "@/components/layout/site-header";
import { getAuthenticatedClaims } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const claims = await getAuthenticatedClaims();

  if (claims) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-secondary">
      <SiteHeader showPrimaryCta={false} />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <section className="animate-enter w-full max-w-md rounded-lg border border-border bg-background p-8 shadow-[var(--shadow-elev-1)]">
          <h1 className="text-[28px] font-[540] leading-[1.14] tracking-normal text-foreground">
            Create your workspace
          </h1>
          <p className="mt-3 text-base leading-6 text-muted-foreground">
            Create your account and start generating polished email drafts.
          </p>
          <div className="mt-8">
            <AuthForm mode="signup" />
          </div>
        </section>
      </main>
    </div>
  );
}
