"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global route error", {
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-6 py-16">
      <section className="w-full max-w-xl rounded-lg border bg-background p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-muted-foreground">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
          The page could not be loaded.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Try again, or return to the home page and continue from there.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
