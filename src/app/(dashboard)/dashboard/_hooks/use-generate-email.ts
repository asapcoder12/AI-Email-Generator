"use client";

import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/api";
import type {
  GeneratedEmail,
  GenerateEmailRequest,
  GenerateEmailResponse,
} from "@/types/email";

async function generateEmail(input: GenerateEmailRequest) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const payload = (await response.json()) as ApiResponse<GeneratedEmail>;

  if (!response.ok || "error" in payload) {
    throw new Error(
      "error" in payload
        ? payload.error.message
        : "Email generation failed. Please try again.",
    );
  }

  return payload.data;
}

export function useGenerateEmail() {
  return useMutation<GenerateEmailResponse["data"], Error, GenerateEmailRequest>({
    mutationFn: generateEmail,
  });
}
