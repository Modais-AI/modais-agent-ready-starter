# Security Setup

This repo blocks common API keys, passwords, private keys, and service tokens before they are committed.

## Where Real Keys Go

- Local development: `.env.local`
- Vercel: Project Settings -> Environment Variables
- Supabase: Project Settings -> API keys
- GitHub Actions: Repository Settings -> Secrets and variables -> Actions

Do not put real keys in React files, docs, Markdown, SQL files, screenshots, committed `.env` files, or issue comments.

## One-Time Setup

```bash
npm run setup:hooks
```

This enables the local pre-commit secret check.

## Safe Commit Command

```bash
npm run commit:safe -- "Describe the change"
```

This command checks the whole repo for likely secrets, stages changes, checks staged changes, and commits only if both checks pass.

## Manual Check

```bash
npm run security:secrets
```

GitHub also runs the same check on pushes and pull requests.
