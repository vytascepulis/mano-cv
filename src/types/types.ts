import type { Tables } from "./supabase.types.ts";
import { QueryData } from "@supabase/supabase-js";
import { userWithSubdomainQuery } from "@/lib/supabase";
import { HttpError } from "@/constants/http";

export type Subdomain = Tables<"subdomains">;
export type User = Tables<"users">;

type ItemType<T> = T extends (infer U)[] ? U : T;
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type UserWithSubdomain = ItemType<
  QueryData<ReturnType<typeof userWithSubdomainQuery>>
>;

export interface ErrorResponse {
  message: HttpError;
}

export interface UserData {
  id: User["id"];
  subdomain: {
    id: Subdomain["id"];
    slug: Subdomain["slug"];
    style: Subdomain["style"];
  } | null;
}

export interface SettingsData {
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

export interface RegisterData {
  id: Subdomain["id"];
  slug: Subdomain["slug"];
}
