export const EMAIL_TONES = [
  "professional",
  "friendly",
  "persuasive",
  "concise",
] as const;

export const EMAIL_LENGTHS = ["short", "medium", "long"] as const;

export type EmailTone = (typeof EMAIL_TONES)[number];
export type EmailLength = (typeof EMAIL_LENGTHS)[number];

export type GenerateEmailRequest = {
  topic: string;
  tone: EmailTone;
  length: EmailLength;
};

export type GeneratedEmail = {
  subject: string;
  body: string;
  provider: "mock";
  generatedAt: string;
};

export type GenerateEmailResponse = {
  data: GeneratedEmail & {
    id?: string;
    topic?: string;
    tone?: EmailTone;
    length?: EmailLength;
    createdAt?: string;
  };
  meta: {
    requestId: string;
  };
};
