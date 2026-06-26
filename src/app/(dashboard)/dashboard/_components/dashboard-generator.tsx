"use client";

import {
  Copy,
  History,
  Loader2,
  Mail,
  MailCheck,
  Sparkles,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateEmail } from "../_hooks/use-generate-email";
import type { EmailHistoryItem } from "@/types/database";
import type { EmailLength, EmailTone, GeneratedEmail } from "@/types/email";

const MAX_TOPIC_CHARS = 500;

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

type CopyStatus = "idle" | "copied" | "failed";

type DashboardGeneratorProps = {
  initialHistory?: EmailHistoryItem[];
};

export function DashboardGenerator({
  initialHistory = [],
}: DashboardGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<EmailTone>("professional");
  const [length, setLength] = useState<EmailLength>("medium");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [history, setHistory] = useState(initialHistory);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [topicTouched, setTopicTouched] = useState(false);
  const generateMutation = useGenerateEmail();
  const generatedEmail = generateMutation.data;
  const topicValidationMessage = getTopicValidationMessage(topic);
  const visibleTopicError =
    topicTouched || submitAttempted ? topicValidationMessage : null;
  const canSubmit = !topicValidationMessage && !generateMutation.isPending;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    setCopyStatus("idle");

    if (topicValidationMessage) {
      return;
    }

    generateMutation.mutate(
      {
        length,
        tone,
        topic: topic.trim(),
      },
      {
        onSuccess(email) {
          if (
            !email.id ||
            !email.topic ||
            !email.tone ||
            !email.length ||
            !email.createdAt
          ) {
            return;
          }

          setHistory((current) => {
            const next = current.filter((item) => item.id !== email.id);

            return [email as EmailHistoryItem, ...next].slice(0, 5);
          });
        },
      },
    );
  }

  async function copyEmail(email: GeneratedEmail) {
    setCopyStatus("idle");

    try {
      await navigator.clipboard.writeText(
        `Subject: ${email.subject}\n\n${email.body}`,
      );
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  const copyLabel = useMemo(() => {
    if (copyStatus === "copied") {
      return "Copied";
    }

    if (copyStatus === "failed") {
      return "Copy failed";
    }

    return "Copy";
  }, [copyStatus]);

  return (
    <div className="grid gap-5">
      <header className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="text-[28px] font-[540] leading-[1.14] text-foreground sm:text-[48px] sm:font-[460] sm:leading-[0.96]">
            Generate an email
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-6 text-muted-foreground">
            Describe the topic, choose the style, and generate a polished draft
            that is ready to review, save, and copy.
          </p>
        </div>
      </header>

      <Card id="generator" className="rounded-lg">
        <CardContent className="p-5 sm:p-6">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="topic">Email topic</Label>
              </div>
              <div className="relative">
                <Textarea
                  aria-describedby={
                    visibleTopicError ? "topic-error" : "topic-counter"
                  }
                  aria-invalid={Boolean(visibleTopicError)}
                  id="topic"
                  maxLength={MAX_TOPIC_CHARS}
                  onBlur={() => setTopicTouched(true)}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="Example: follow up after a demo for a design agency"
                  required
                  value={topic}
                  className="min-h-[126px] resize-y pb-10"
                />
                <p
                  className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted-foreground"
                  id="topic-counter"
                >
                  {topic.length} / {MAX_TOPIC_CHARS}
                </p>
              </div>
              {visibleTopicError ? (
                <p
                  className="text-sm font-medium text-destructive"
                  id="topic-error"
                  role="alert"
                >
                  {visibleTopicError}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="tone">Tone</Label>
                <Select
                  onValueChange={(value) => setTone(value as EmailTone)}
                  value={tone}
                >
                  <SelectTrigger aria-label="Email tone" id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="length">Length</Label>
                <Select
                  onValueChange={(value) => setLength(value as EmailLength)}
                  value={length}
                >
                  <SelectTrigger aria-label="Email length" id="length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    {lengthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              aria-label="Generate email"
              className="dashboard-primary-action w-full"
              disabled={!canSubmit}
              type="submit"
            >
              {generateMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="size-4" aria-hidden="true" />
              )}
              {generateMutation.isPending ? "Generating..." : "Generate email"}
            </Button>

            {generateMutation.isError ? (
              <Alert role="alert" variant="destructive">
                <AlertTitle>Generation failed</AlertTitle>
                <AlertDescription>
                  {generateMutation.error.message}
                </AlertDescription>
              </Alert>
            ) : null}
          </form>
        </CardContent>
      </Card>

      <Card aria-live="polite" className="rounded-lg">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-3 text-[22px] font-[460] leading-[1.1]">
              <MailCheck className="size-5" aria-hidden="true" />
              Result preview
            </CardTitle>
            <CardDescription>
              Your generated email will appear here after you submit a topic.
            </CardDescription>
          </div>
          {generatedEmail ? (
            <Button
              aria-label="Copy generated email"
              onClick={() => copyEmail(generatedEmail)}
              size="sm"
              type="button"
              variant="outline"
            >
              <Copy className="size-4" aria-hidden="true" />
              {copyLabel}
            </Button>
          ) : null}
        </CardHeader>
        <CardContent>
          {generateMutation.isPending ? (
            <div className="rounded-lg border border-border bg-secondary p-5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-3 h-4 w-11/12" />
              <Skeleton className="mt-3 h-4 w-8/12" />
            </div>
          ) : null}

          {!generateMutation.isPending && generatedEmail ? (
            <div className="animate-enter rounded-lg border border-border bg-secondary p-5">
              <p className="text-xs font-semibold uppercase text-primary/70">
                Subject
              </p>
              <h2 className="mt-1 text-lg font-semibold leading-snug">
                {generatedEmail.subject}
              </h2>
              <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-7 text-foreground">
                {generatedEmail.body}
              </pre>
              {copyStatus === "failed" ? (
                <p className="mt-4 text-sm font-medium text-destructive" role="status">
                  Copy failed. Please try again.
                </p>
              ) : null}
            </div>
          ) : null}

          {!generateMutation.isPending && !generatedEmail ? (
            <div className="flex min-h-[160px] flex-col items-center justify-center rounded-lg border border-dashed bg-secondary p-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-[var(--shadow-elev-1)]">
                <Mail className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                No draft generated yet.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card id="recent-drafts" className="rounded-lg">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-3 text-[22px] font-[460] leading-[1.1]">
              <History className="size-5" aria-hidden="true" />
              Recent drafts
            </CardTitle>
            <CardDescription>
              The latest saved generated emails from your account.
            </CardDescription>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/dashboard#recent-drafts">View all drafts</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="overflow-hidden rounded-lg border">
              {history.map((item) => {
                const generatedDate = formatDraftDate(item.createdAt);

                return (
                  <article
                    className="grid min-h-[76px] gap-3 border-b bg-background px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center"
                    key={item.id}
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {item.subject}
                      </h3>
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
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[132px] flex-col items-center justify-center rounded-lg border border-dashed bg-secondary p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-[var(--shadow-elev-1)]">
                <History className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Your saved generated emails will appear here after the first
                successful generation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getTopicValidationMessage(topic: string) {
  const trimmedTopic = topic.trim();

  if (!trimmedTopic) {
    return "Describe what the email should be about.";
  }

  if (trimmedTopic.length < 3) {
    return "Topic must be at least 3 characters.";
  }

  if (topic.length > MAX_TOPIC_CHARS) {
    return `Topic must be ${MAX_TOPIC_CHARS} characters or fewer.`;
  }

  return null;
}

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
