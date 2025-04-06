import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.types";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const userWithSubdomainQuery = supabase
  .from("users")
  .select(
    "id, googleId, status, subdomain!inner(id, slug, style, status, code)",
  );

export const subdomainQuery = supabase
  .from("users")
  .select("*, subdomain!inner(*)");

export const userDataByGoogleIdQuery = supabase
  .from("users")
  .select("status, subdomain(slug)")
  .limit(1);

export const createUserMutation = supabase.from("users");
