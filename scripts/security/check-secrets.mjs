#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
const args = new Set(process.argv.slice(2));
const scanStaged = args.has("--staged");
const SKIP_DIRS = new Set([".git", "node_modules", ".next", "dist", "build", ".vercel", ".cache", ".temp", ".tmp"]);
const SKIP_FILES = new Set(["package-lock.json"]);
const BINARY_EXTENSIONS = new Set([".docx", ".zip", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".pdf"]);
const RULES = [
  { name: "Supabase key", regex: /\bsb_(?:publishable|secret|service)_[A-Za-z0-9_-]{16,}\b/g },
  { name: "OpenAI or Anthropic key", regex: /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}\b/g },
  { name: "Resend API key", regex: /\bre_[A-Za-z0-9_-]{20,}\b/g },
  { name: "Stripe secret or webhook key", regex: /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b|\bwhsec_[A-Za-z0-9]{16,}\b/g },
  { name: "Google API key", regex: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { name: "JWT-like token", regex: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/g },
  { name: "Private key block", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { name: "Hardcoded password/secret assignment", regex: /\b(?:password|passwd|secret|client_secret|service_role_key)\b\s*[:=]\s*["'][^"'\n]{12,}["']/gi }
];
function git(args, options = {}) { return execFileSync("git", args, { encoding: "utf8", ...options }).trim(); }
function listFiles() {
  if (scanStaged) {
    const output = git(["diff", "--cached", "--name-only", "--diff-filter=ACMR"]);
    return output ? output.split("\n") : [];
  }
  const output = git(["ls-files", "--others", "--cached", "--exclude-standard"]);
  return output ? output.split("\n") : [];
}
function shouldSkip(file) {
  if (!file || SKIP_FILES.has(file) || !existsSync(file)) return true;
  if (file.split("/").some((part) => SKIP_DIRS.has(part))) return true;
  const lower = file.toLowerCase();
  for (const extension of BINARY_EXTENSIONS) if (lower.endsWith(extension)) return true;
  const stat = statSync(file);
  return !stat.isFile() || stat.size > 5_000_000;
}
function contentFor(file) {
  try {
    if (scanStaged) return git(["show", `:${file}`], { maxBuffer: 10 * 1024 * 1024 });
    const buffer = readFileSync(file);
    if (buffer.includes(0)) return "";
    return buffer.toString("utf8");
  } catch { return ""; }
}
function mask(secret) { return secret.length <= 12 ? "[hidden]" : `${secret.slice(0, 6)}...${secret.slice(-4)}`; }
function scanFile(file, content) {
  const findings = [];
  const lines = content.split(/\r?\n/);
  for (const rule of RULES) {
    for (const [index, line] of lines.entries()) {
      rule.regex.lastIndex = 0;
      let match;
      while ((match = rule.regex.exec(line)) !== null) {
        const value = match[0];
        if (/your-|xxxx|REPLACE_WITH|sk-ant-\.\.\.|re_\.\.\.|placeholder/i.test(value)) continue;
        findings.push({ file, line: index + 1, rule: rule.name, preview: mask(value) });
      }
    }
  }
  return findings;
}
const findings = listFiles().filter((file) => !shouldSkip(file)).flatMap((file) => scanFile(file, contentFor(file)));
if (findings.length > 0) {
  console.error("\nSecret check failed. Nothing has been committed.");
  console.error("A likely API key, password, or private token was found.\n");
  console.error("What to do:");
  console.error("1. Remove the real key from the file.");
  console.error("2. Put the real value in Vercel/Supabase/GitHub environment variables instead.");
  console.error("3. Commit the safe placeholder only, then try the commit again.\n");
  console.error("Findings:");
  for (const finding of findings) console.error(`- ${finding.file}:${finding.line} (${finding.rule}) ${finding.preview}`);
  console.error("");
  process.exit(1);
}
console.log("Secret check passed. No likely API keys or passwords found.");
