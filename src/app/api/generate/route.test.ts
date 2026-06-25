import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ensureProfileForClaims,
  saveGeneratedEmail,
} from "@/lib/supabase/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { POST } from "./route";

vi.mock("@/lib/supabase/data", () => ({
  ensureProfileForClaims: vi.fn().mockResolvedValue({
    createdAt: "2026-06-25T00:00:00.000Z",
    email: "user@example.com",
    fullName: null,
    id: "user-1",
    plan: "free",
    updatedAt: "2026-06-25T00:00:00.000Z",
  }),
  getClaimSubject: vi.fn((claims: Record<string, unknown> | null) =>
    typeof claims?.sub === "string" ? claims.sub : null,
  ),
  saveGeneratedEmail: vi.fn(async (_supabase, input) => ({
    body: input.body,
    createdAt: "2026-06-25T00:00:00.000Z",
    generatedAt: input.generatedAt,
    id: "email-1",
    length: input.length,
    provider: input.provider,
    subject: input.subject,
    tone: input.tone,
    topic: input.topic,
  })),
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(),
}));

function mockClaims(claims: Record<string, unknown> | null) {
  vi.mocked(createSupabaseServerClient).mockResolvedValue({
    auth: {
      getClaims: vi.fn().mockResolvedValue({
        data: claims ? { claims } : null,
        error: claims ? null : new Error("Unauthorized"),
      }),
    },
  } as never);
}

describe("POST /api/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when the user is not authenticated", async () => {
    mockClaims(null);

    const response = await POST(
      new Request("http://localhost/api/generate", {
        body: JSON.stringify({
          length: "short",
          tone: "friendly",
          topic: "Renewal note",
        }),
        method: "POST",
      }) as never,
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({
      error: {
        code: "UNAUTHORIZED",
      },
    });
  });

  it("returns validation details for invalid input", async () => {
    mockClaims({ sub: "user-1", email: "user@example.com" });

    const response = await POST(
      new Request("http://localhost/api/generate", {
        body: JSON.stringify({
          length: "giant",
          tone: "friendly",
          topic: "",
        }),
        method: "POST",
      }) as never,
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: {
        code: "VALIDATION_ERROR",
        details: {
          length: "Length must be short, medium, or long.",
          topic: "Topic must be at least 3 characters.",
        },
      },
    });
  });

  it("returns a generated mock email for valid input", async () => {
    mockClaims({ sub: "user-1", email: "user@example.com" });

    const response = await POST(
      new Request("http://localhost/api/generate", {
        body: JSON.stringify({
          length: "medium",
          tone: "professional",
          topic: "Post-demo follow up",
        }),
        method: "POST",
      }) as never,
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      data: {
        id: "email-1",
        provider: "mock",
        subject: "Update: post-demo follow up",
        topic: "Post-demo follow up",
      },
    });
    expect(ensureProfileForClaims).toHaveBeenCalledOnce();
    expect(saveGeneratedEmail).toHaveBeenCalledOnce();
  });

  it("returns a database error when generated email persistence fails", async () => {
    mockClaims({ sub: "user-1", email: "user@example.com" });
    vi.mocked(saveGeneratedEmail).mockRejectedValueOnce(
      new Error("relation does not exist"),
    );

    const response = await POST(
      new Request("http://localhost/api/generate", {
        body: JSON.stringify({
          length: "medium",
          tone: "professional",
          topic: "Post-demo follow up",
        }),
        method: "POST",
      }) as never,
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      error: {
        code: "DATABASE_ERROR",
      },
    });
  });
});
