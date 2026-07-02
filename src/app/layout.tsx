import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Ready Starter",
  description: "A clean starter app wired for Vercel, Supabase, Codex, and Claude Code."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
