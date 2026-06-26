import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export function SecurityNote() {
  return (
    <section className="animate-enter min-h-[85px] rounded-[10px] border border-[#e0e0e8] bg-white p-5 shadow-[0_16px_42px_rgba(20,18,56,0.03)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-[#f0ebff] text-[#3928e8]">
            <Lock className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-bold leading-5 text-[#111438]">
              Your data is secure
            </h2>
            <p className="mt-1 text-base leading-6 text-[#464a70]">
              We use industry-standard encryption to keep your data safe and
              private.
            </p>
          </div>
        </div>

        <Link
          className="inline-flex min-h-11 shrink-0 items-center gap-3 text-base font-bold text-[#3928e8] transition-colors hover:text-[#2417b8]"
          href="/pricing"
        >
          Learn more
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
