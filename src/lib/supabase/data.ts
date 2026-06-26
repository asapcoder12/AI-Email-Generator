import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  EmailHistoryItem,
  UserPlan,
  UserProfile,
} from "@/types/database";
import type {
  EmailLength,
  EmailTone,
  GeneratedEmail,
  GenerateEmailRequest,
} from "@/types/email";

type Claims = Record<string, unknown>;

type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  plan: UserPlan;
  created_at: string;
  updated_at: string;
};

type GeneratedEmailRow = {
  id: string;
  topic: string;
  tone: EmailTone;
  length: EmailLength;
  subject: string;
  body: string;
  provider: "mock";
  generated_at: string;
  created_at: string;
};

type SaveGeneratedEmailInput = GenerateEmailRequest &
  Pick<GeneratedEmail, "subject" | "body" | "provider" | "generatedAt"> & {
    userId: string;
  };

export async function ensureProfileForClaims(
  supabase: SupabaseClient,
  claims: Claims,
) {
  const userId = getClaimSubject(claims);

  if (!userId) {
    return null;
  }

  const email = getClaimString(claims, "email") ?? "Signed-in user";
  const fullName =
    getClaimString(claims, "full_name") ?? getClaimString(claims, "name");
  const profilePayload = {
    email,
    id: userId,
    ...(fullName ? { full_name: fullName } : {}),
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" })
    .select("id,email,full_name,plan,created_at,updated_at")
    .single();

  if (error) {
    throw new Error(`Could not sync user profile: ${error.message}`);
  }

  return mapProfile(data as ProfileRow);
}

export async function getProfileForUser(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,plan,created_at,updated_at")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Could not load user profile: ${error.message}`);
  }

  return mapProfile(data as ProfileRow);
}

export async function saveGeneratedEmail(
  supabase: SupabaseClient,
  input: SaveGeneratedEmailInput,
) {
  const { data, error } = await supabase
    .from("generated_emails")
    .insert({
      body: input.body,
      generated_at: input.generatedAt,
      length: input.length,
      provider: input.provider,
      subject: input.subject,
      tone: input.tone,
      topic: input.topic,
      user_id: input.userId,
    })
    .select(
      "id,topic,tone,length,subject,body,provider,generated_at,created_at",
    )
    .single();

  if (error) {
    throw new Error(`Could not save generated email: ${error.message}`);
  }

  return mapGeneratedEmail(data as GeneratedEmailRow);
}

export async function listGeneratedEmails(
  supabase: SupabaseClient,
  userId: string,
  limit = 5,
) {
  const { data, error } = await supabase
    .from("generated_emails")
    .select(
      "id,topic,tone,length,subject,body,provider,generated_at,created_at",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Could not load generated emails: ${error.message}`);
  }

  return (data as GeneratedEmailRow[]).map(mapGeneratedEmail);
}

export async function countGeneratedEmails(
  supabase: SupabaseClient,
  userId: string,
) {
  const { count, error } = await supabase
    .from("generated_emails")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Could not count generated emails: ${error.message}`);
  }

  return count ?? 0;
}

export function getClaimSubject(claims: Claims | null) {
  return getClaimString(claims, "sub");
}

function getClaimString(claims: Claims | null, key: string) {
  const value = claims?.[key];

  return typeof value === "string" && value.length > 0 ? value : null;
}

function mapProfile(row: ProfileRow): UserProfile {
  return {
    createdAt: row.created_at,
    email: row.email,
    fullName: row.full_name,
    id: row.id,
    plan: row.plan,
    updatedAt: row.updated_at,
  };
}

function mapGeneratedEmail(row: GeneratedEmailRow): EmailHistoryItem {
  return {
    body: row.body,
    createdAt: row.created_at,
    generatedAt: row.generated_at,
    id: row.id,
    length: row.length,
    provider: row.provider,
    subject: row.subject,
    tone: row.tone,
    topic: row.topic,
  };
}
