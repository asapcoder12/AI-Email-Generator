import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-6 py-16">
      <section className="animate-enter w-full max-w-xl rounded-lg border bg-background p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
          This page is not available.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The link may be outdated, or the page may have moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go home</Link>
        </Button>
      </section>
    </main>
  );
}
