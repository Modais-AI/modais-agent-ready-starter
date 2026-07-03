import { CheckCircle2, ClipboardList, Database, Eye, GitBranch, Laptop, MessageSquareText, ShieldCheck, Wand2 } from "lucide-react";

const canDo = [
  {
    icon: Wand2,
    title: "Change the design",
    text: "Ask Codex or Claude to improve a page, add a section, fix mobile layout, or match the Modais style guide."
  },
  {
    icon: MessageSquareText,
    title: "Update the words",
    text: "Rewrite page copy, add service descriptions, turn rough notes into polished sections, or make the tone clearer."
  },
  {
    icon: Database,
    title: "Add simple data",
    text: "Create Supabase tables, seed demo rows, and keep the database setup written down for the next person."
  },
  {
    icon: ShieldCheck,
    title: "Keep secrets out",
    text: "The repo checks for API keys and private tokens before commits and in GitHub Actions."
  }
];

const steps = [
  {
    title: "Install the project",
    command: "npm install",
    note: "Downloads the app tools. Do this once after opening the folder."
  },
  {
    title: "Connect your local settings",
    command: "npm run setup:guided",
    note: "Creates the local env file, asks for Supabase details, and turns on the safety hook."
  },
  {
    title: "Check what is missing",
    command: "npm run setup:doctor",
    note: "Shows what is connected and what still needs a dashboard click or pasted key."
  },
  {
    title: "Run the app",
    command: "npm run dev",
    note: "Starts the website on your computer so you can preview changes."
  }
];

const connected = [
  "GitHub stores the project and change history.",
  "Vercel publishes previews and the live website.",
  "Supabase stores app data when the project needs it.",
  "Codex and Claude follow the instructions already written into this repo."
];

export default function SetupPage() {
  return (
    <main className="setup-main owner-setup">
      <nav className="site-nav" aria-label="Primary">
        <a className="brand-mark" href="/" aria-label="modais home">mod<span>a</span>is</a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a className="button primary small" href="https://calendly.com/matt-modais/30min">Book a free chat</a>
        </div>
      </nav>

      <section className="owner-hero">
        <p className="eyebrow"><span aria-hidden="true" /> Plain-English setup</p>
        <h1>A ready-to-edit website workspace.</h1>
        <p className="lede">
          This is a starting project for a business owner who wants to use Codex or Claude to make useful website and app changes without rebuilding the technical setup every time.
        </p>
      </section>

      <section className="plain-section intro-split" aria-label="What this does">
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> What it does</p>
          <h2>It gives the AI the rails it needs.</h2>
        </div>
        <div className="plain-copy">
          <p>
            The repo already knows the brand direction, where the app files live, how Supabase should be changed, how commits should be checked, and what the agent should avoid touching without care.
          </p>
          <p>
            The owner still asks in normal language. The project provides the structure around that request.
          </p>
        </div>
      </section>

      <section className="simple-card-grid" aria-label="What you can do with it">
        {canDo.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="steps-section" aria-label="Step by step instructions">
        <div className="steps-intro">
          <p className="eyebrow"><span aria-hidden="true" /> First run</p>
          <h2>Run these four commands.</h2>
          <p>Open the project folder in your terminal, then run each command in order.</p>
        </div>
        <div className="step-list">
          {steps.map((step, index) => (
            <article key={step.command}>
              <span className="step-number">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <code>{step.command}</code>
                <p>{step.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plain-section" aria-label="Connected services">
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> What gets connected</p>
          <h2>The outside accounts stay simple.</h2>
        </div>
        <div className="connection-list">
          {connected.map((item) => (
            <div className="status-row" key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></div>
          ))}
        </div>
      </section>

      <section className="handoff-panel" aria-label="Before handoff">
        <div>
          <Eye aria-hidden="true" />
          <h2>Before handing it to someone</h2>
          <p>Run the doctor and fix anything marked FAIL. Warnings usually mean an external account still needs connecting.</p>
        </div>
        <pre><code>npm run setup:doctor</code></pre>
      </section>
    </main>
  );
}
