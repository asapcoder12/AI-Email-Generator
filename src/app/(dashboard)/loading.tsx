import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-enter rounded-lg border border-border bg-background p-6 shadow-[var(--shadow-elev-1)]">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="mt-4 h-32 w-full" />
      <Skeleton className="mt-4 h-11 w-40" />
    </div>
  );
}
