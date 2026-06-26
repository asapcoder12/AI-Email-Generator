import { Lock } from "lucide-react";
import Link from "next/link";

export function SecurityNote() {
  return (
    <section className="animate-enter rounded-xl border bg-accent/10 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/25 text-primary">
            <Lock className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">
              Your data is secure
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              We use industry-standard encryption to keep your data safe and
              private.
            </p>
          </div>
        </div>

        <Link
          className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          href="/pricing"
        >
          Learn more &rarr;
        </Link>
      </div>
    </section>
  );
}
