import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ExternalLink, MessageSquareText, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Agent Ready Starter · Modais Tooling",
  description: "A plain-English setup page for the Modais Agent Ready Starter template."
};

const githubUrl = "https://github.com/Modais-AI/modais-agent-ready-starter";

const outcomes = [
  "A working website/app starter with the setup already organised.",
  "Instructions Codex and Claude can follow from the first prompt.",
  "A safe commit workflow that checks for leaked API keys.",
  "Supabase, Vercel, and GitHub notes in one predictable place."
];

const steps = [
  {
    title: "Open the GitHub template",
    text: "Use the template link to create your own copy of the project. This gives you a clean repo without changing the original.",
    action: "Use this template"
  },
  {
    title: "Open the folder locally",
    text: "Clone the repo to your computer and open it in Codex or Claude Code. The project instructions are already included.",
    action: "Open in your coding app"
  },
  {
    title: "Run the setup command",
    text: "The guided setup creates your local settings file, asks for Supabase details, and turns on the safety checks.",
    action: "npm run setup:guided"
  },
  {
    title: "Check what is missing",
    text: "The doctor command tells you what is ready and what still needs a dashboard click, pasted key, or account connection.",
    action: "npm run setup:doctor"
  },
  {
    title: "Start making changes",
    text: "Ask for a design change, copy update, new page, or simple Supabase feature. Review locally or in Vercel previews.",
    action: "npm run dev"
  }
];

const prompts = [
  "Improve the homepage design but keep the Modais style guide.",
  "Add a new section explaining our services in plain English.",
  "Run the setup doctor and explain what still needs connecting.",
  "Create a Supabase table for enquiries and add safe setup notes."
];

export default function ToolingPage() {
  return (
    <main className="tooling-page">
      <nav className="site-nav" aria-label="Primary">
        <a className="brand-mark" href="/" aria-label="modais home">mod<span>a</span>is</a>
        <div className="nav-links">
          <a href="/setup">Setup page</a>
          <a className="button primary small" href={githubUrl}>Open GitHub</a>
        </div>
      </nav>

      <section className="tooling-hero">
        <p className="eyebrow"><span aria-hidden="true" /> Modais tooling</p>
        <h1>Start with a project the AI already understands.</h1>
        <p className="lede">
          Agent Ready Starter is a free template for people who want to use Codex or Claude Code to improve a website or simple app without spending the first day wiring GitHub, Vercel, Supabase, and project instructions together.
        </p>
        <div className="actions">
          <a className="button primary" href={githubUrl}>Get the GitHub template <ExternalLink aria-hidden="true" /></a>
          <a className="button secondary" href="#steps">See the steps</a>
        </div>
        <p className="microcopy">This page is ready to move into the Modais website under Tooling.</p>
      </section>

      <section className="tooling-overview" aria-label="What you get">
        <div className="overview-card main-overview">
          <Sparkles aria-hidden="true" />
          <h2>What this gives you</h2>
          <p>
            A ready-to-edit project folder with the app, setup commands, brand rules, Supabase notes, and safety checks already written down.
          </p>
        </div>
        <div className="overview-list">
          {outcomes.map((outcome) => (
            <div className="status-row" key={outcome}>
              <CheckCircle2 aria-hidden="true" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="tooling-fit" aria-label="Who this is for">
        <article>
          <MessageSquareText aria-hidden="true" />
          <h2>Good for</h2>
          <p>Founders, consultants, and small teams who want to ask for practical website changes in normal language and review the result.</p>
        </article>
        <article>
          <ShieldCheck aria-hidden="true" />
          <h2>Not for</h2>
          <p>Complex production systems that need custom architecture, private data flows, or hands-on engineering decisions from day one.</p>
        </article>
      </section>

      <section id="steps" className="public-steps" aria-label="Step by step process">
        <div className="steps-intro">
          <p className="eyebrow"><span aria-hidden="true" /> Step by step</p>
          <h2>How to get it running.</h2>
          <p>Follow this order. The commands are intentionally boring so the setup is easy to debug.</p>
        </div>
        <div className="public-step-list">
          {steps.map((step, index) => (
            <article key={step.title}>
              <span className="step-number">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <code>{step.action}</code>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prompt-panel" aria-label="Example prompts">
        <div>
          <PlayCircle aria-hidden="true" />
          <h2>First things to ask it</h2>
          <p>Once the app is running locally, start with one small request and review the change before asking for the next one.</p>
        </div>
        <div className="prompt-list">
          {prompts.map((prompt) => <code key={prompt}>{prompt}</code>)}
        </div>
      </section>

      <section className="tooling-footer-cta" aria-label="Get started">
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> Ready when you are</p>
          <h2>Use it as a starting point, not a black box.</h2>
        </div>
        <a className="button primary" href={githubUrl}>Open the template <ArrowRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}
