import { CopySubjectButton } from "./copy-subject-button";

type AccountDetailsCardProps = {
  subject: string;
};

export function AccountDetailsCard({ subject }: AccountDetailsCardProps) {
  return (
    <section className="animate-enter min-h-[236px] rounded-[10px] border border-[#e0e0e8] bg-white p-6 shadow-[0_16px_42px_rgba(20,18,56,0.04)] sm:p-[25px]">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-[#0b0d2e]">
          Account details
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#464a70]">
          Your unique account identifier used to securely store and retrieve
          your data.
        </p>
      </div>

      <div className="mt-7 rounded-[10px] border border-[#e6e4ee] bg-white px-5 py-4">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-5 text-[#636782]">
              Supabase subject
            </p>
            <p className="mt-2 break-all font-mono text-base leading-6 text-[#111438]">
              {subject}
            </p>
          </div>
          <CopySubjectButton value={subject} />
        </div>
      </div>
    </section>
  );
}
