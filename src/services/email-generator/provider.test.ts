import { describe, expect, it } from "vitest";
import { MockEmailProvider } from "./provider";

describe("MockEmailProvider", () => {
  it("generates deterministic tone-specific subject prefixes", async () => {
    const provider = new MockEmailProvider();

    const email = await provider.generate({
      length: "short",
      tone: "persuasive",
      topic: "New onboarding campaign",
      userId: "user-1",
    });

    expect(email.provider).toBe("mock");
    expect(email.subject).toBe("Opportunity: new onboarding campaign");
    expect(email.body).toContain("There is a timely opportunity around");
  });

  it("adds more content for long emails than short emails", async () => {
    const provider = new MockEmailProvider();

    const shortEmail = await provider.generate({
      length: "short",
      tone: "professional",
      topic: "Quarterly customer update",
      userId: "user-1",
    });
    const longEmail = await provider.generate({
      length: "long",
      tone: "professional",
      topic: "Quarterly customer update",
      userId: "user-1",
    });

    expect(longEmail.body.length).toBeGreaterThan(shortEmail.body.length);
  });
});
