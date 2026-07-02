# Security Checklist

- `.env`, `.env.local`, `.npmrc`, private keys, credentials JSON, and service-role keys are not committed.
- `npm run security:secrets` passes.
- `npm run setup:hooks` has been run locally.
- Supabase tables have RLS enabled unless there is a documented reason.
- Browser code only uses `NEXT_PUBLIC_*` values.
- Service-role keys are only used in server-only code.
- GitHub Actions do not expose secrets to pull requests from untrusted forks.
- Agent workflows are optional and limited to trusted users.
