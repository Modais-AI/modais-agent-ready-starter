#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ENV_FILE = ".env.local";
const ENV_EXAMPLE = ".env.example";

function parseEnv(text) {
  const values = new Map();
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values.set(match[1], match[2]);
  }
  return values;
}

function serializeEnv(values) {
  const ordered = [
    ["NEXT_PUBLIC_SUPABASE_URL", "https://your-project.supabase.co"],
    ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "your-publishable-key"],
    ["SUPABASE_SERVICE_ROLE_KEY", "your-service-role-key"]
  ];
  const lines = ["# Local development values. Never commit this file."];
  for (const [key, fallback] of ordered) {
    lines.push(`${key}=${values.get(key) || fallback}`);
  }
  lines.push("", "# Optional agent automation secrets. Prefer GitHub/Vercel secrets, not this file.", "# OPENAI_API_KEY=", "# ANTHROPIC_API_KEY=", "");
  return lines.join("\n");
}

function isPlaceholder(value) {
  return !value || value.includes("your-") || value.includes("placeholder");
}

function run(command, args) {
  return spawnSync(command, args, { stdio: "inherit", shell: false });
}

if (!existsSync(ENV_FILE)) {
  if (existsSync(ENV_EXAMPLE)) {
    copyFileSync(ENV_EXAMPLE, ENV_FILE);
    console.log(`Created ${ENV_FILE} from ${ENV_EXAMPLE}.`);
  } else {
    writeFileSync(ENV_FILE, serializeEnv(new Map()));
    console.log(`Created ${ENV_FILE}.`);
  }
}

const current = parseEnv(readFileSync(ENV_FILE, "utf8"));
const rl = createInterface({ input, output });

console.log("\nAgent Ready Starter setup\n");
console.log("Paste Supabase values from Project Settings -> API.");
console.log("Leave a prompt blank to keep the current value.\n");

const url = await rl.question(`Supabase Project URL [${isPlaceholder(current.get("NEXT_PUBLIC_SUPABASE_URL")) ? "missing" : current.get("NEXT_PUBLIC_SUPABASE_URL")}]: `);
if (url.trim()) current.set("NEXT_PUBLIC_SUPABASE_URL", url.trim());

const key = await rl.question(`Supabase publishable/anon key [${isPlaceholder(current.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")) ? "missing" : "already set"}]: `);
if (key.trim()) current.set("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", key.trim());

const serviceRole = await rl.question("Optional service-role key for server-only scripts [leave blank]: ");
if (serviceRole.trim()) current.set("SUPABASE_SERVICE_ROLE_KEY", serviceRole.trim());

rl.close();
writeFileSync(ENV_FILE, serializeEnv(current));
console.log(`\nUpdated ${ENV_FILE}.`);

const hooks = run("git", ["config", "core.hooksPath", ".githooks"]);
if (hooks.status === 0) console.log("Enabled local git secret-scanning hook.");

console.log("\nNext steps:");
console.log("1. Run the migration SQL in Supabase: supabase/migrations/0001_initial_schema.sql");
console.log("2. Run the seed SQL if you want demo rows: supabase/seed.sql");
console.log("3. Run: npm run setup:doctor");
console.log("4. Add the same public Supabase env vars to Vercel.");
