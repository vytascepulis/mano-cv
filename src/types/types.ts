import type { Tables } from "./supabase.types.ts";
import { QueryData } from "@supabase/supabase-js";
import { userWithSubdomainQuery } from "@/lib/supabase";

export type Subdomain = Tables<"subdomains">;
export type User = Tables<"users">;

type ItemType<T> = T extends (infer U)[] ? U : T;

export type UserWithSubdomain = ItemType<
  QueryData<ReturnType<typeof userWithSubdomainQuery>>
>;

export interface UserData {
  id: User["id"];
  subdomain: {
    id: Subdomain["id"];
    slug: Subdomain["slug"];
    style: Subdomain["style"];
  } | null;
}

export interface SubdomainData {
  id: Subdomain["id"];
  slug: Subdomain["slug"];
  style: Subdomain["style"];
}
