"use client";

import { Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type CopyStatus = "idle" | "copied" | "failed";

type CopySubjectButtonProps = {
  value: string;
};

export function CopySubjectButton({ value }: CopySubjectButtonProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const copyLabel = useMemo(() => {
    if (copyStatus === "copied") {
      return "Copied";
    }

    if (copyStatus === "failed") {
      return "Copy failed";
    }

    return "Copy";
  }, [copyStatus]);

  async function handleCopy() {
    setCopyStatus("idle");

    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <Button
      aria-label="Copy Supabase subject"
      className="h-11 shrink-0 rounded-lg border-[#e6e4ee] bg-white px-4 text-[15px] font-bold text-[#3928e8] hover:bg-[#f7f4ff]"
      onClick={handleCopy}
      size="sm"
      type="button"
      variant="outline"
    >
      <Copy className="size-4" aria-hidden="true" />
      {copyLabel}
    </Button>
  );
}
