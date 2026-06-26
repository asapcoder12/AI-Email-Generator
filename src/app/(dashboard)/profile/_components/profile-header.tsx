import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function ProfileHeader() {
  return (
    <header className="animate-enter flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <Badge
          className="w-fit border-transparent bg-accent/30 text-primary"
          variant="accent"
        >
          Profile
        </Badge>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Account profile
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          View and manage your account details.
        </p>
      </div>

      <div aria-hidden="true" className="hidden shrink-0 opacity-90 sm:block">
        <Image
          alt=""
          className="size-[120px] lg:size-[140px]"
          height={140}
          priority
          src="/media/profile-avatar-placeholder.svg"
          width={140}
        />
      </div>
    </header>
  );
}
