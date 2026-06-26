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
      className={`min-h-[216px] rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-elev-1)] sm:p-8 ${animationClass}`}
    >
      <span className="flex size-16 items-center justify-center rounded-lg bg-accent text-primary">
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-7 text-base font-[540] leading-6 text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 break-words text-[22px] font-[460] leading-[1.1] text-foreground">
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
