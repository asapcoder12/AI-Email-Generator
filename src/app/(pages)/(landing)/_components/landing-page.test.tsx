import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LandingPage } from "./landing-page";

describe("LandingPage", () => {
  it("renders the hero, benefits, FAQ, and CTA content", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        name: /ai email generator for campaigns/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Benefits").length).toBeGreaterThan(0);
    expect(screen.getByText("Questions before your first generated email")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /create account/i })).toHaveAttribute(
      "href",
      "/signup",
    );
  });
});
