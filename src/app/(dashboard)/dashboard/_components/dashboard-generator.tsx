"use client";

import { Copy, History, MailCheck, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
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

type DashboardGeneratorProps = {
  initialHistory?: EmailHistoryItem[];
};

export function DashboardGenerator({
  initialHistory = [],
}: DashboardGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<EmailTone>("professional");
  const [length, setLength] = useState<EmailLength>("medium");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState(initialHistory);
  const generateMutation = useGenerateEmail();
  const generatedEmail = generateMutation.data;
  const canSubmit = topic.trim().length >= 3 && !generateMutation.isPending;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopied(false);
    generateMutation.mutate(
      {
        topic,
        tone,
        length,
      },
      {
        onSuccess(email) {
          if (!email.id || !email.topic || !email.tone || !email.length || !email.createdAt) {
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
    try {
      await navigator.clipboard.writeText(
        `Subject: ${email.subject}\n\n${email.body}`,
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const resultLabel = useMemo(() => {
    if (generateMutation.isPending) {
      return "Generating draft";
    }

    if (generatedEmail) {
      return "Generated result";
    }

    return "Result preview";
  }, [generateMutation.isPending, generatedEmail]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <Badge className="w-fit" variant="accent">
            Dashboard
          </Badge>
          <CardTitle className="text-3xl">Generate an email</CardTitle>
          <CardDescription>
            Describe the topic, choose the style, and generate a mock-powered
            draft that can later be backed by a real LLM provider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="topic">Email topic</Label>
              <Textarea
                id="topic"
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Example: follow up after a demo for a design agency"
                required
                value={topic}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="tone">Tone</Label>
                <Select onValueChange={(value) => setTone(value as EmailTone)} value={tone}>
                  <SelectTrigger id="tone">
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
                  <SelectTrigger id="length">
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
            <Button disabled={!canSubmit} type="submit">
              <Sparkles className="size-4" />
              {generateMutation.isPending ? "Generating" : "Generate"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card aria-live="polite">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MailCheck className="size-5" />
            {resultLabel}
          </CardTitle>
          <CardDescription>
            Generated drafts are saved to your Supabase-backed history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generateMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Generation failed</AlertTitle>
              <AlertDescription>{generateMutation.error.message}</AlertDescription>
            </Alert>
          ) : null}

          {generateMutation.isPending ? (
            <div className="grid gap-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-28 w-full" />
            </div>
          ) : null}

          {!generateMutation.isPending && generatedEmail ? (
            <div className="rounded-md border bg-secondary p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">Subject:</p>
                  <h2 className="mt-1 text-xl font-semibold">
                    {generatedEmail.subject}
                  </h2>
                </div>
                <Button
                  onClick={() => copyEmail(generatedEmail)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Copy className="size-4" />
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-7 text-foreground">
                {generatedEmail.body}
              </pre>
            </div>
          ) : null}

          {!generateMutation.isPending &&
          !generateMutation.isError &&
          !generatedEmail ? (
            <div className="rounded-md border border-dashed bg-secondary p-6 text-sm leading-6 text-muted-foreground">
              Your generated email will appear here after you submit a topic.
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <History className="size-5" />
            Recent drafts
          </CardTitle>
          <CardDescription>
            The latest saved generated emails from your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="grid gap-3">
              {history.map((item) => (
                <article
                  className="rounded-md border bg-secondary p-4"
                  key={item.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{item.subject}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {item.topic}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Badge variant="secondary">{item.tone}</Badge>
                      <Badge variant="outline">{item.length}</Badge>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed bg-secondary p-6 text-sm leading-6 text-muted-foreground">
              Your saved generated emails will appear here after the first
              successful generation.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
