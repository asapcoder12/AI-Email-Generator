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
      className={`rounded-xl border bg-card p-6 shadow-sm sm:p-8 ${animationClass}`}
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-accent/25 text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-5 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-lg font-semibold text-foreground">
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
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
