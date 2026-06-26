import { CalendarDays, Mail, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProfileSummaryCardsProps = {
  email: string;
  planLabel: string;
  savedDrafts: number;
};

type SummaryCardProps = {
  animationClass?: string;
  icon: LucideIcon;
  label: string;
  value: string;
};

function SummaryCard({
  animationClass = "animate-enter",
  icon: Icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div
      className={`min-h-[216px] rounded-[10px] border border-[#e0e0e8] bg-white p-6 shadow-[0_16px_42px_rgba(20,18,56,0.04)] sm:p-[25px] ${animationClass}`}
    >
      <span className="flex size-[62px] items-center justify-center rounded-[10px] bg-[#f0ebff] text-[#3928e8]">
        <Icon className="size-[30px]" aria-hidden="true" />
      </span>
      <p className="mt-7 text-[17px] font-bold leading-6 text-[#575a76]">
        {label}
      </p>
      <p className="mt-3 break-words text-2xl font-bold leading-7 text-[#0b0d2e]">
        {value}
      </p>
    </div>
  );
}

export function ProfileSummaryCards({
  email,
  planLabel,
  savedDrafts,
}: ProfileSummaryCardsProps) {
  return (
    <section
      aria-label="Account summary"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <SummaryCard icon={UserRound} label="Email" value={email} />
      <SummaryCard
        animationClass="animate-enter animate-enter-delay-1"
        icon={CalendarDays}
        label="Plan"
        value={planLabel}
      />
      <SummaryCard
        animationClass="animate-enter animate-enter-delay-2"
        icon={Mail}
        label="Saved drafts"
        value={savedDrafts.toString()}
      />
    </section>
  );
}
