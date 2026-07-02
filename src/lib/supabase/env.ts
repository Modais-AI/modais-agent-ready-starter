export function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value || value.startsWith("your-")) return undefined;
  return value;
}

export function publicSupabaseEnv() {
  const url = optionalEnv("NEXT_PUBLIC_SUPABASE_URL");
  const publishableKey = optionalEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}
