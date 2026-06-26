import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function ProfileHeader() {
  return (
    <header className="animate-enter flex min-h-[166px] flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <Badge
          className="h-9 w-fit rounded-lg border-transparent bg-[#efeaff] px-4 text-lg font-bold text-[#3928e8]"
          variant="accent"
        >
          Profile
        </Badge>
        <h1 className="mt-6 text-4xl font-bold leading-none text-[#0b0d2e] sm:text-[56px]">
          Account profile
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#464a70] sm:text-[19px]">
          View and manage your account details.
        </p>
      </div>

      <div aria-hidden="true" className="hidden shrink-0 pt-5 sm:block">
        <Image
          alt=""
          className="size-[120px] rounded-full object-cover lg:size-[140px]"
          height={140}
          priority
          src="/images/avatar.png"
          width={140}
        />
      </div>
    </header>
  );
}
