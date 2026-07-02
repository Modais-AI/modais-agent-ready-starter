# Deployment

Use Vercel for the app and managed Supabase for data/auth/storage.

## Deploy Button

After this repo is published as a template, update the README deploy button:

```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_ORG/YOUR_TEMPLATE_REPO&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
```

## Required Environment Variables

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Only add `SUPABASE_SERVICE_ROLE_KEY` to Vercel if you have server-only routes that need it. Never expose it to client code.
