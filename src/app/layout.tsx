import type { Metadata } from "next";
import { AppProviders } from "./providers";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Email Generator",
    template: "%s | AI Email Generator",
  },
  description:
    "Generate polished outreach, sales, and lifecycle emails from a short topic brief.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
