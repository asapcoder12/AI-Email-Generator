import { randomUUID } from "crypto";
import { type NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  ensureProfileForClaims,
  getClaimSubject,
  saveGeneratedEmail,
} from "@/lib/supabase/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getEmailGeneratorProvider } from "@/services/email-generator/provider";
import { validateGenerateEmailRequest } from "@/services/email-generator/validation";

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") ?? randomUUID();

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
      return errorResponse(
        "UNAUTHORIZED",
        "Sign in to generate an email.",
        401,
        requestId,
      );
    }

    const userId = getClaimSubject(data.claims as Record<string, unknown>);

    if (!userId) {
      return errorResponse(
        "UNAUTHORIZED",
        "Sign in to generate an email.",
        401,
        requestId,
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return errorResponse(
        "INVALID_JSON",
        "Request body must be valid JSON.",
        400,
        requestId,
      );
    }

    const validation = validateGenerateEmailRequest(body);

    if (!validation.ok) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Please check the email generation fields.",
        400,
        requestId,
        validation.details,
      );
    }

    try {
      await ensureProfileForClaims(
        supabase,
        data.claims as Record<string, unknown>,
      );
    } catch (profileError) {
      console.error("Profile sync failed", {
        requestId,
        message:
          profileError instanceof Error ? profileError.message : "Unknown error",
      });

      return errorResponse(
        "DATABASE_ERROR",
        "Account data could not be synced. Apply the Supabase migration and try again.",
        500,
        requestId,
      );
    }

    const provider = getEmailGeneratorProvider();
    const generatedEmail = await provider.generate({
      ...validation.data,
      userId,
    });

    try {
      const savedEmail = await saveGeneratedEmail(supabase, {
        ...validation.data,
        ...generatedEmail,
        userId,
      });

      return successResponse(savedEmail, requestId);
    } catch (saveError) {
      console.error("Generated email persistence failed", {
        requestId,
        message: saveError instanceof Error ? saveError.message : "Unknown error",
      });

      return errorResponse(
        "DATABASE_ERROR",
        "Generated email could not be saved. Apply the Supabase migration and try again.",
        500,
        requestId,
      );
    }
  } catch (error) {
    const isMissingSupabase =
      error instanceof Error && error.message.includes("Supabase is not configured");

    if (isMissingSupabase) {
      return errorResponse(
        "AUTH_NOT_CONFIGURED",
        "Supabase auth is not configured yet.",
        500,
        requestId,
      );
    }

    console.error("Email generation failed", {
      requestId,
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return errorResponse(
      "INTERNAL_ERROR",
      "Email generation failed. Please try again.",
      500,
      requestId,
    );
  }
}
