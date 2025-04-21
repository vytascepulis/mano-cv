import type { Tables } from "./supabase.types.ts";
import { QueryData } from "@supabase/supabase-js";
import {
  registerSlugMutation,
  userSettingsQuery,
  userSubdomainQuery,
} from "@/lib/supabase";
import { HttpError } from "@/constants/http";

export type Subdomain = Tables<"subdomains">;
export type User = Tables<"users">;

// type ItemType<T> = T extends (infer U)[] ? U : T;
//
// export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
//   Partial<Pick<T, K>>;

export type UserSubdomainQueryResponse = QueryData<
  ReturnType<typeof userSubdomainQuery>
>;

export type UserSettingsQueryResponse = QueryData<
  ReturnType<typeof userSettingsQuery>
>;

export type RegisterSlugMutationResponse = QueryData<
  ReturnType<typeof registerSlugMutation>
>;

export interface ErrorResponse {
  message: HttpError;
}

export type SettingsData = UserSettingsQueryResponse;

export type SubdomainData = Omit<UserSubdomainQueryResponse, "subdomain"> & {
  subdomain: Omit<UserSubdomainQueryResponse["subdomain"], "code">;
};

export type RegisterData = RegisterSlugMutationResponse;
