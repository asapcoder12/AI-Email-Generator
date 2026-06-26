import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function ProfileHeader() {
  return (
    <header className="animate-enter flex min-h-[166px] flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <Badge
          className="h-9 w-fit px-4 text-sm font-[600]"
          variant="accent"
        >
          Profile
        </Badge>
        <h1 className="mt-6 text-[36px] font-[540] leading-[0.96] text-foreground sm:text-[48px] sm:font-[460]">
          Account profile
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-6 text-muted-foreground sm:text-lg">
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
