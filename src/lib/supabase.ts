import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.types";
import { sha256 } from "@/utils/crypto";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const userWithSubdomainQuery = ({ subdomain }: { subdomain: string }) =>
  supabase
    .from("users")
    .select(
      "id, googleId, status, subdomain!inner(id, slug, style, status, code)",
    )
    .eq("subdomain.slug", subdomain)
    .limit(1)
    .single();

export const subdomainSettingsQuery = ({ subdomain }: { subdomain: string }) =>
  supabase
    .from("users")
    .select("*, subdomain!inner(*)")
    .eq("subdomain.slug", subdomain)
    .limit(1)
    .single();

export const userDataByGoogleIdQuery = ({
  hashedGoogleId,
}: {
  hashedGoogleId: string;
}) =>
  supabase
    .from("users")
    .select("status, subdomain(slug)")
    .eq("googleId", hashedGoogleId)
    .limit(1)
    .single();

export const createUserMutation = ({
  hashedGoogleId,
  email,
}: {
  hashedGoogleId: string;
  email: string;
}) =>
  supabase
    .from("users")
    .insert({
      googleId: hashedGoogleId,
      email,
    })
    .select("status")
    .single();
