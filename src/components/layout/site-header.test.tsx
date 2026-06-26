import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithClient } from "@/test/utils";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe("SiteHeader", () => {
  it("shows public navigation actions for signed-out visitors", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: /^sign in$/i })[0]).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getAllByRole("link", { name: /get started/i })[0]).toHaveAttribute(
      "href",
      "/signup",
    );
    expect(screen.getByRole("button", { name: /open navigation/i })).toHaveClass(
      "md:hidden",
    );
  });

  it("shows app navigation actions for signed-in users", () => {
    renderWithClient(<SiteHeader isAuthenticated />);

    expect(screen.getAllByRole("link", { name: /dashboard/i })[0]).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getAllByRole("button", { name: /sign out/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /^sign in$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /get started/i })).not.toBeInTheDocument();
  });
});
