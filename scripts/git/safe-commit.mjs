#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
const message = process.argv.slice(2).join(" ").trim();
const secretsScript = join(dirname(fileURLToPath(import.meta.url)), "..", "security", "check-secrets.mjs");
function run(command, args, options = {}) { return spawnSync(command, args, { stdio: "inherit", shell: false, ...options }); }
function output(command, args) { return execFileSync(command, args, { encoding: "utf8" }).trim(); }
function fail(message, code = 1) { console.error(`\n${message}\n`); process.exit(code); }
if (!message) fail(['No commit message was provided.', '', 'Use:', '  npm run commit:safe -- "Describe the change"'].join("\n"));
const status = output("git", ["status", "--porcelain"]);
if (!status) { console.log("No changes to commit."); process.exit(0); }
console.log("\nStep 1 of 4: Checking the whole repo for secrets...");
let result = run(process.execPath, [secretsScript]);
if (result.status !== 0) fail("Commit stopped before anything was staged. Remove the likely secret shown above.", result.status || 1);
console.log("\nStep 2 of 4: Staging safe changes...");
result = run("git", ["add", "-A"]);
if (result.status !== 0) fail("Commit stopped because git could not stage the changes.", result.status || 1);
console.log("\nStep 3 of 4: Checking staged changes for secrets...");
result = run(process.execPath, [secretsScript, "--staged"]);
if (result.status !== 0) fail("Commit stopped. Remove the real key, replace it with a placeholder, then run the command again.", result.status || 1);
console.log("\nStep 4 of 4: Creating commit...");
result = run("git", ["commit", "-m", message]);
if (result.status !== 0) fail("Commit did not complete. See the git message above.", result.status || 1);
