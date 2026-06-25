import type { EmailLength, EmailTone, GeneratedEmail } from "./email";

export const USER_PLANS = ["free", "pro", "business"] as const;

export type UserPlan = (typeof USER_PLANS)[number];

export type UserProfile = {
  id: string;
  email: string;
  fullName: string | null;
  plan: UserPlan;
  createdAt: string;
  updatedAt: string;
};

export type EmailHistoryItem = GeneratedEmail & {
  id: string;
  topic: string;
  tone: EmailTone;
  length: EmailLength;
  createdAt: string;
};
