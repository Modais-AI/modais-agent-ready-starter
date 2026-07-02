import { CheckCircle2, ClipboardList, Cloud, Code2, Database, GitBranch, KeyRound, ShieldCheck } from "lucide-react";

const systems = [
  {
    icon: GitBranch,
    title: "GitHub",
    status: "Human click",
    text: "Create the repo from this template or add an origin remote, then push main."
  },
  {
    icon: Cloud,
    title: "Vercel",
    status: "Human OAuth",
    text: "Use the Deploy Button or Vercel import flow, then add the Supabase public env vars."
  },
  {
    icon: Database,
    title: "Supabase",
    status: "Guided paste",
    text: "Run setup:guided, paste the project URL and publishable key, then run the migration SQL."
  },
  {
    icon: ShieldCheck,
    title: "Security hooks",
    status: "Automated",
    text: "The setup script enables the local pre-commit scanner and CI runs the same check."
  },
  {
    icon: Code2,
    title: "Codex and Claude",
    status: "Already in repo",
    text: "AGENTS.md, CLAUDE.md, repo skills, and Claude commands are checked in."
  },
  {
    icon: KeyRound,
    title: "Agent CI secrets",
    status: "Optional",
    text: "Only add OpenAI or Anthropic keys to GitHub Secrets when optional CI agents are enabled."
  }
];

const commands = [
  "npm install",
  "npm run setup:guided",
  "npm run setup:doctor",
  "npm run dev"
];

export default function SetupPage() {
  return (
    <main className="setup-main">
      <nav className="site-nav" aria-label="Primary">
        <a className="brand-mark" href="/" aria-label="modais home">mod<span>a</span>is</a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a className="button primary small" href="https://calendly.com/matt-modais/30min">Book a free chat</a>
        </div>
      </nav>

      <section className="setup-hero">
        <p className="eyebrow"><span aria-hidden="true" /> Connect the systems</p>
        <h1>One clean path from template to working client repo.</h1>
        <p className="lede">
          The setup command handles local files and hooks. The doctor tells you exactly which external systems still need a dashboard click, OAuth connection, or pasted key.
        </p>
        <div className="command-strip" aria-label="Setup commands">
          {commands.map((command) => <code key={command}>{command}</code>)}
        </div>
      </section>

      <section className="systems-grid" aria-label="Systems checklist">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <article key={system.title}>
              <div className="system-heading">
                <Icon aria-hidden="true" />
                <div>
                  <h2>{system.title}</h2>
                  <p>{system.status}</p>
                </div>
              </div>
              <p>{system.text}</p>
            </article>
          );
        })}
      </section>

      <section className="setup-flow">
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> Verification</p>
          <h2>Run the doctor before handoff.</h2>
        </div>
        <div className="data-box">
          <div className="status-row"><CheckCircle2 aria-hidden="true" /><span>Checks Node, dependencies, Git, hooks, GitHub remote, Vercel link, agent instructions, and Supabase.</span></div>
          <div className="status-row"><ClipboardList aria-hidden="true" /><span>Prints OK, WARN, or FAIL with the exact next step.</span></div>
          <pre><code>npm run setup:doctor</code></pre>
        </div>
      </section>
    </main>
  );
}
