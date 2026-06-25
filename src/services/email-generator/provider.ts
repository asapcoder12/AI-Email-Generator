import type {
  EmailLength,
  EmailTone,
  GeneratedEmail,
  GenerateEmailRequest,
} from "@/types/email";

export type GenerateEmailInput = GenerateEmailRequest & {
  userId: string;
};

export type EmailGeneratorProvider = {
  generate(input: GenerateEmailInput): Promise<GeneratedEmail>;
};

const toneOpeners: Record<EmailTone, string> = {
  professional: "I wanted to share a focused update about",
  friendly: "I thought you might like a quick note about",
  persuasive: "There is a timely opportunity around",
  concise: "Quick note on",
};

const toneClosers: Record<EmailTone, string> = {
  professional: "If this is useful, I would be glad to discuss the next step.",
  friendly: "Happy to send more details if it sounds useful.",
  persuasive: "A short conversation could clarify the upside quickly.",
  concise: "Reply when you want the next step.",
};

const lengthDetails: Record<EmailLength, string[]> = {
  short: [
    "The goal is to keep the message clear, useful, and easy to act on.",
  ],
  medium: [
    "The goal is to keep the message clear, useful, and easy to act on.",
    "It highlights the strongest reason to care without burying the reader in extra context.",
  ],
  long: [
    "The goal is to keep the message clear, useful, and easy to act on.",
    "It highlights the strongest reason to care without burying the reader in extra context.",
    "The structure gives the recipient enough confidence to respond, forward, or book time without needing a follow-up explanation.",
  ],
};

export class MockEmailProvider implements EmailGeneratorProvider {
  async generate(input: GenerateEmailInput): Promise<GeneratedEmail> {
    const topic = normalizeTopic(input.topic);
    const subject = buildSubject(topic, input.tone);
    const body = [
      `Hi there,`,
      `${toneOpeners[input.tone]} ${topic}.`,
      ...lengthDetails[input.length],
      toneClosers[input.tone],
      `Best,`,
      `AI Email Generator`,
    ].join("\n\n");

    return {
      subject,
      body,
      provider: "mock",
      generatedAt: new Date().toISOString(),
    };
  }
}

function buildSubject(topic: string, tone: EmailTone) {
  const prefixByTone: Record<EmailTone, string> = {
    professional: "Update:",
    friendly: "Thought this may help:",
    persuasive: "Opportunity:",
    concise: "Quick note:",
  };

  return `${prefixByTone[tone]} ${topic}`;
}

function normalizeTopic(topic: string) {
  const trimmed = topic.trim().replace(/\s+/g, " ");
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

export function getEmailGeneratorProvider(): EmailGeneratorProvider {
  const provider = process.env.AI_PROVIDER ?? "mock";

  if (provider !== "mock") {
    throw new Error("Only the mock AI provider is enabled in this MVP.");
  }

  return new MockEmailProvider();
}
