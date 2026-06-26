import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export function SecurityNote() {
  return (
    <section className="animate-enter min-h-[85px] rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-elev-1)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
            <Lock className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-bold leading-5 text-foreground">
              Your data is secure
            </h2>
            <p className="mt-1 text-base leading-6 text-muted-foreground">
              We use industry-standard encryption to keep your data safe and
              private.
            </p>
          </div>
        </div>

        <Link
          className="inline-flex min-h-11 shrink-0 items-center gap-3 text-base font-bold text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          href="/pricing"
        >
          Learn more
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
