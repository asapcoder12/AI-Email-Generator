import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithClient } from "@/test/utils";
import { DashboardGenerator } from "./dashboard-generator";

describe("DashboardGenerator", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates and displays an email result", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({
          data: {
            body: "Hello from the generated body.",
            createdAt: "2026-06-25T00:00:00.000Z",
            generatedAt: "2026-06-25T00:00:00.000Z",
            id: "email-1",
            length: "medium",
            provider: "mock",
            subject: "Update: test launch",
            tone: "professional",
            topic: "Test launch update",
          },
          meta: {
            requestId: "request-1",
          },
        }),
        ok: true,
      }),
    );

    renderWithClient(<DashboardGenerator />);

    await user.type(
      screen.getByLabelText(/email topic/i),
      "Test launch update",
    );
    await user.click(screen.getByRole("button", { name: /generate/i }));

    await screen.findAllByText("Update: test launch");
    expect(screen.getAllByText("Update: test launch")).toHaveLength(2);
    expect(screen.getAllByText("Hello from the generated body.")).toHaveLength(2);
  });

  it("shows API errors inline", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({
          error: {
            code: "UNAUTHORIZED",
            message: "Sign in to generate an email.",
          },
          meta: {
            requestId: "request-1",
          },
        }),
        ok: false,
      }),
    );

    renderWithClient(<DashboardGenerator />);

    await user.type(screen.getByLabelText(/email topic/i), "Renewal message");
    await user.click(screen.getByRole("button", { name: /generate/i }));

    await waitFor(() => {
      expect(screen.getByText("Generation failed")).toBeInTheDocument();
    });
    expect(screen.getByText("Sign in to generate an email.")).toBeInTheDocument();
  });

  it("renders initial saved draft history", () => {
    renderWithClient(
      <DashboardGenerator
        initialHistory={[
          {
            body: "Saved body",
            createdAt: "2026-06-25T00:00:00.000Z",
            generatedAt: "2026-06-25T00:00:00.000Z",
            id: "saved-1",
            length: "short",
            provider: "mock",
            subject: "Saved subject",
            tone: "friendly",
            topic: "Saved topic",
          },
        ]}
      />,
    );

    expect(screen.getByText("Saved subject")).toBeInTheDocument();
    expect(screen.getByText("Saved body")).toBeInTheDocument();
  });
});
