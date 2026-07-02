import { CheckCircle2, Database, GitBranch, ShieldCheck, Sparkles } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const setupItems = [
  "GitHub template repo",
  "Vercel preview deployments",
  "Supabase schema folder",
  "Codex and Claude instructions",
  "Local and CI secret scanning"
];

const workflows = [
  { title: "Capture the know-how", text: "Turn expert judgement, review steps, and repeatable decisions into a project the agent can understand." },
  { title: "Build the system", text: "Use Supabase, Vercel previews, and guided repo instructions to ship the first useful workflow." },
  { title: "Keep it safe", text: "Protect client data, block committed secrets, and keep service-role access out of browser code." }
];

type StarterProject = { name: string; status: string };

export default async function Home() {
  const supabase = createSupabaseServerClient();
  let projects: StarterProject[] = [];

  if (supabase) {
    const { data } = await supabase.from("starter_projects").select("name, status").limit(3);
    projects = data ?? [];
  }

  return (
    <main>
      <nav className="site-nav" aria-label="Primary">
        <a className="brand-mark" href="#" aria-label="modais home">mod<span>a</span>is</a>
        <div className="nav-links">
          <a href="/setup">Setup</a>
          <a className="button primary small" href="https://calendly.com/matt-modais/30min">Book a free chat</a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" /> AI for expertise-led businesses · Built in Australia</p>
          <h1>Scale your experts,<br /><em>not your setup time.</em></h1>
          <p className="lede">
            A Modais-branded starter for handing clients a repo they can open locally, prompt safely,
            preview on Vercel, and grow without rebuilding the same GitHub, Supabase, and agent setup.
          </p>
          <div className="actions">
            <a className="button primary" href="https://calendly.com/matt-modais/30min">Find your first AI project</a>
            <a className="button secondary" href="/setup">Connect the systems</a>
          </div>
          <p className="microcopy">Start with a working template. Run the guided setup once. Keep the client in review, not in setup screens.</p>
        </div>
        <div className="status-panel" aria-label="Included setup">
          {setupItems.map((item) => (
            <div className="status-row" key={item}>
              <CheckCircle2 aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="systems" className="section-grid" aria-label="Core setup">
        <article>
          <GitBranch aria-hidden="true" />
          <h2>Preview-first workflow</h2>
          <p>Every meaningful change can be reviewed locally or through Vercel preview deployments before it goes live.</p>
        </article>
        <article>
          <Database aria-hidden="true" />
          <h2>Supabase included</h2>
          <p>Migrations, seed data, env examples, and setup notes are already in the repo.</p>
        </article>
        <article>
          <ShieldCheck aria-hidden="true" />
          <h2>Secret-safe commits</h2>
          <p>Local git hooks and GitHub Actions block common API keys and service tokens from being committed.</p>
        </article>
      </section>

      <section className="workflows">
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> How it works</p>
          <h2>Prompt the repo, not a blank chatbot.</h2>
        </div>
        <div className="workflow-list">
          {workflows.map((workflow) => (
            <article key={workflow.title}>
              <Sparkles aria-hidden="true" />
              <h3>{workflow.title}</h3>
              <p>{workflow.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="data-preview">
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> Supabase check</p>
          <h2>Demo data appears here after you apply the seed.</h2>
        </div>
        <div className="data-box">
          {projects.length ? (
            projects.map((project) => (
              <div className="status-row" key={project.name}>
                <CheckCircle2 aria-hidden="true" />
                <span>{project.name} - {project.status}</span>
              </div>
            ))
          ) : (
            <p>No Supabase rows found yet. Apply `supabase/seed.sql` after creating the project.</p>
          )}
        </div>
      </section>
    </main>
  );
}
