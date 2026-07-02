#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const supabaseOnly = process.argv.includes("--supabase-only");

function parseEnvFile(file) {
  if (!existsSync(file)) return new Map();
  const values = new Map();
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values.set(match[1], match[2]);
  }
  return values;
}

function isPlaceholder(value) {
  return !value || value.includes("your-") || value.includes("placeholder");
}

function commandOk(command, args) {
  const result = spawnSync(command, args, { stdio: "ignore", shell: false });
  return result.status === 0;
}

function output(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

const checks = [];
function pass(system, message) { checks.push({ state: "pass", system, message }); }
function warn(system, message) { checks.push({ state: "warn", system, message }); }
function fail(system, message) { checks.push({ state: "fail", system, message }); }

const env = parseEnvFile(".env.local");
const url = env.get("NEXT_PUBLIC_SUPABASE_URL");
const publishableKey = env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

if (!supabaseOnly) {
  const nodeMajor = Number(output("node", ["-p", "process.versions.node.split('.')[0]"]));
  if (nodeMajor >= 22) pass("Node", `Node ${output("node", ["-v"])} is supported.`);
  else fail("Node", "Use Node 22+ for this template.");

  if (existsSync("node_modules")) pass("Dependencies", "node_modules exists.");
  else warn("Dependencies", "Run npm install.");

  if (existsSync(".git")) pass("Git", "Git repo initialized.");
  else warn("Git", "Run git init or create from a GitHub template.");

  const hooksPath = output("git", ["config", "core.hooksPath"]);
  if (hooksPath === ".githooks") pass("Git hooks", "Local secret-scanning hook is enabled.");
  else warn("Git hooks", "Run npm run setup:hooks.");

  const remote = output("git", ["remote", "get-url", "origin"]);
  if (remote) pass("GitHub", `origin remote set: ${remote}`);
  else warn("GitHub", "No origin remote yet. Push this repo to GitHub or create it from the template.");

  if (existsSync(".vercel/project.json")) pass("Vercel", "Vercel project is linked locally.");
  else warn("Vercel", "Not linked locally. Use the Deploy Button, Vercel import flow, or vercel link.");

  for (const file of ["AGENTS.md", "CLAUDE.md", ".agents/skills/design-refresh/SKILL.md", ".claude/commands/design-refresh.md"]) {
    if (existsSync(file)) pass("Agent instructions", `${file} exists.`);
    else fail("Agent instructions", `${file} is missing.`);
  }
}

if (isPlaceholder(url) || isPlaceholder(publishableKey)) {
  fail("Supabase", "Missing Supabase URL or publishable key in .env.local. Run npm run setup:guided.");
} else {
  try {
    new URL(url);
    const supabase = createClient(url, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("starter_projects").select("name, status").limit(1);
    if (!error) pass("Supabase", "Connected and starter_projects is readable.");
    else if (String(error.message || "").toLowerCase().includes("does not exist")) {
      warn("Supabase", "Connected, but starter_projects is missing. Run supabase/migrations/0001_initial_schema.sql and then supabase/seed.sql.");
    } else if (String(error.message || "").toLowerCase().includes("permission")) {
      warn("Supabase", `Connected, but RLS/policy blocked the read: ${error.message}`);
    } else {
      warn("Supabase", `Supabase responded, but verification failed: ${error.message}`);
    }
  } catch (error) {
    fail("Supabase", `Could not verify Supabase: ${error.message}`);
  }
}

const icon = { pass: "OK", warn: "WARN", fail: "FAIL" };
console.log("\nSystem connection doctor\n");
for (const check of checks) console.log(`[${icon[check.state]}] ${check.system}: ${check.message}`);
const failed = checks.filter((check) => check.state === "fail").length;
const warnings = checks.filter((check) => check.state === "warn").length;
console.log(`\nResult: ${failed} failed, ${warnings} warning(s).`);
if (failed) process.exit(1);
