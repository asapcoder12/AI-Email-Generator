import { CopySubjectButton } from "./copy-subject-button";

type AccountDetailsCardProps = {
  subject: string;
};

export function AccountDetailsCard({ subject }: AccountDetailsCardProps) {
  return (
    <section className="animate-enter rounded-xl border bg-card p-6 shadow-sm sm:p-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Account details</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
          Your unique account identifier used to securely store and retrieve
          your data.
        </p>
      </div>

      <div className="mt-6 rounded-xl border bg-background p-4 sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Supabase subject</p>
            <p className="mt-2 break-all font-mono text-sm text-foreground">
              {subject}
            </p>
          </div>
          <CopySubjectButton value={subject} />
        </div>
      </div>
    </section>
  );
}
