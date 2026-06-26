"use client";

import { Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { EmailHistoryItem } from "@/types/database";
import type { EmailLength, EmailTone } from "@/types/email";

const toneOptions: Array<{ label: string; value: EmailTone }> = [
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
  { label: "Persuasive", value: "persuasive" },
  { label: "Concise", value: "concise" },
];

const lengthOptions: Array<{ label: string; value: EmailLength }> = [
  { label: "Short", value: "short" },
  { label: "Medium", value: "medium" },
  { label: "Long", value: "long" },
];

function getPreviewText(body: string) {
  return body.trim().replace(/\s+/g, " ");
}

function getToneLabel(value: EmailTone) {
  return toneOptions.find((option) => option.value === value)?.label ?? value;
}

function getLengthLabel(value: EmailLength) {
  return lengthOptions.find((option) => option.value === value)?.label ?? value;
}

function formatDraftDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      date: "Recently",
      time: "",
    };
  }

  return {
    date: new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
}

type CopyStatus = "idle" | "copied" | "failed";

export function DraftDialog({ item }: { item: EmailHistoryItem }) {
  const generatedDate = formatDraftDate(item.createdAt);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  async function copyEmail() {
    setCopyStatus("idle");
    try {
      await navigator.clipboard.writeText(
        `Subject: ${item.subject}\n\n${item.body}`,
      );
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  const copyLabel = useMemo(() => {
    if (copyStatus === "copied") return "Copied";
    if (copyStatus === "failed") return "Copy failed";
    return "Copy";
  }, [copyStatus]);

  return (
    <Dialog onOpenChange={(open) => !open && setCopyStatus("idle")}>
      <DialogTrigger asChild>
        <article className="grid min-h-[76px] cursor-pointer gap-3 border-b bg-background px-4 py-3 transition-colors hover:bg-secondary/50 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-[540]">{item.subject}</h3>
            <p className="mt-1 line-clamp-1 text-sm leading-6 text-muted-foreground">
              {getPreviewText(item.body)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Badge className="bg-secondary" variant="outline">
              {getToneLabel(item.tone)}
            </Badge>
            <Badge className="bg-secondary" variant="outline">
              {getLengthLabel(item.length)}
            </Badge>
          </div>
          <time
            className="text-left text-sm leading-5 text-muted-foreground sm:min-w-[104px] sm:text-right"
            dateTime={item.createdAt}
          >
            <span className="block">{generatedDate.date}</span>
            <span className="block">{generatedDate.time}</span>
          </time>
        </article>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="flex-row items-start justify-between gap-4 space-y-0 border-b pb-4 pr-14">
          <div className="min-w-0 space-y-1 pr-4">
            <DialogTitle className="text-xl font-[540] leading-snug">
              {item.subject}
            </DialogTitle>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className="bg-secondary" variant="outline">
                {getToneLabel(item.tone)}
              </Badge>
              <Badge className="bg-secondary" variant="outline">
                {getLengthLabel(item.length)}
              </Badge>
            </div>
          </div>
          <Button
            aria-label="Copy generated email"
            onClick={copyEmail}
            size="sm"
            type="button"
            variant="outline"
            className="shrink-0 mt-0"
          >
            <Copy className="size-4 mr-2" aria-hidden="true" />
            {copyLabel}
          </Button>
        </DialogHeader>
        <div className="py-2">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-foreground">
            {item.body}
          </pre>
          {copyStatus === "failed" ? (
            <p className="mt-4 text-sm font-[540] text-destructive" role="status">
              Copy failed. Please try again.
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
