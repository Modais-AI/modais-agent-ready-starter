#!/usr/bin/env node
import { existsSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
if (!existsSync(".env.local") && existsSync(".env.example")) {
  copyFileSync(".env.example", ".env.local");
  console.log("Created .env.local from .env.example. Fill in real Supabase values before running the app.");
}
const result = spawnSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);
console.log("Git hooks enabled.");
