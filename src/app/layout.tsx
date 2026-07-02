import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "modais · Agent-ready AI systems",
  description: "Modais-style starter for building client-editable AI systems with Codex, Claude Code, Vercel, and Supabase."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
