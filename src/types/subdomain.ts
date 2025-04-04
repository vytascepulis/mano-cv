import type { Tables } from "./supabase.types.ts";

export type Subdomain = Tables<"subdomains">;

export interface SubdomainData {
  style: Subdomain["style"];
  slug: Subdomain["slug"];
}
