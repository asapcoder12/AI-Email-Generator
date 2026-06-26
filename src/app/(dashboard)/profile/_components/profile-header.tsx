import Image from "next/image";


export function ProfileHeader() {
  return (
    <header className="animate-enter flex min-h-[166px] flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h1 className="mt-6 text-[36px] font-[540] leading-[0.96] tracking-[-0.99px] text-foreground sm:text-[48px] sm:font-[460] sm:tracking-[-1.32px]">
          Account profile
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-6 text-muted-foreground sm:text-lg sm:font-[540] sm:tracking-[-0.135px]">
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
