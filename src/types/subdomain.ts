import type { Database } from "../../database.types";

export type Subdomain = Database["public"]["Tables"]["subdomains"]["Row"];

export interface SubdomainData {
  style: Subdomain["style"];
  slug: Subdomain["slug"];
}
