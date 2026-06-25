import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="mt-4 h-32 w-full" />
      <Skeleton className="mt-4 h-11 w-40" />
    </div>
  );
}
