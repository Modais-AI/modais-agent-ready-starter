import { createClient } from "@supabase/supabase-js";
import { publicSupabaseEnv } from "./env";

export function createSupabaseServerClient() {
  const env = publicSupabaseEnv();
  if (!env) return null;
  return createClient(env.url, env.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
