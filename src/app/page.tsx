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
  { title: "Design refresh", text: "Update pages while preserving claims, layout constraints, and the design system." },
  { title: "Supabase change", text: "Add tables through migrations with RLS and clear setup notes." },
  { title: "Security check", text: "Scan for secrets, service-role leaks, and unsafe environment variable usage." }
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
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Client-editable app workspace</p>
          <h1>Agent-ready setup for Codex, Claude Code, Vercel, and Supabase.</h1>
          <p className="lede">
            A practical template for handing non-technical clients a repo they can open locally,
            prompt safely, preview on Vercel, and grow without rebuilding setup from scratch.
          </p>
          <div className="actions">
            <a className="button primary" href="/docs/SETUP.md">Setup guide</a>
            <a className="button secondary" href="https://vercel.com/new/clone">Deploy flow</a>
          </div>
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

      <section className="section-grid" aria-label="Core setup">
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
          <p className="eyebrow">Agent workflows</p>
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
          <p className="eyebrow">Supabase check</p>
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
