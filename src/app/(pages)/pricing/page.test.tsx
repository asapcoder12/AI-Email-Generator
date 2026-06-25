import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("renders pricing tiers and upgrade actions", () => {
    render(<PricingPage />);

    expect(screen.getByRole("heading", { name: /choose a plan/i })).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /upgrade/i })).toHaveLength(2);
  });
});
