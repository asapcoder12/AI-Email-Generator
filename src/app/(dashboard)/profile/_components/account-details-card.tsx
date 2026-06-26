import { CopySubjectButton } from "./copy-subject-button";

type AccountDetailsCardProps = {
  subject: string;
};

export function AccountDetailsCard({ subject }: AccountDetailsCardProps) {
  return (
    <section className="animate-enter min-h-[236px] rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-elev-1)] sm:p-8">
      <div>
        <h2 className="text-[22px] font-[460] leading-[1.1] tracking-[-0.315px] text-foreground">
          Account details
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-6 text-muted-foreground">
          Your unique account identifier used to securely store and retrieve
          your data.
        </p>
      </div>

      <div className="mt-7 rounded-lg border border-border bg-background px-5 py-4">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-[460] leading-[1.4] text-muted-foreground">
              Supabase subject
            </p>
            <p className="mt-2 break-all font-mono text-base leading-6 text-foreground">
              {subject}
            </p>
          </div>
          <CopySubjectButton value={subject} />
        </div>
      </div>
    </section>
  );
}
