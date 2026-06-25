import {
  EMAIL_LENGTHS,
  EMAIL_TONES,
  type GenerateEmailRequest,
} from "@/types/email";

type ValidationResult =
  | {
      ok: true;
      data: GenerateEmailRequest;
    }
  | {
      ok: false;
      details: Record<string, string>;
    };

export function validateGenerateEmailRequest(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      details: {
        body: "Request body must be an object.",
      },
    };
  }

  const value = input as Record<string, unknown>;
  const details: Record<string, string> = {};
  const topic = typeof value.topic === "string" ? value.topic.trim() : "";
  const tone = value.tone;
  const length = value.length;

  if (topic.length < 3) {
    details.topic = "Topic must be at least 3 characters.";
  }

  if (topic.length > 160) {
    details.topic = "Topic must be 160 characters or fewer.";
  }

  if (!EMAIL_TONES.includes(tone as GenerateEmailRequest["tone"])) {
    details.tone = "Tone must be professional, friendly, persuasive, or concise.";
  }

  if (!EMAIL_LENGTHS.includes(length as GenerateEmailRequest["length"])) {
    details.length = "Length must be short, medium, or long.";
  }

  if (Object.keys(details).length > 0) {
    return {
      ok: false,
      details,
    };
  }

  return {
    ok: true,
    data: {
      topic,
      tone: tone as GenerateEmailRequest["tone"],
      length: length as GenerateEmailRequest["length"],
    },
  };
}
