import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.types";
import { SubdomainStatus } from "@/types/supabase.enums";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const userSubdomainQuery = ({ subdomain }: { subdomain: string }) =>
  supabase
    .from("users")
    .select(
      `userStatus:status, subdomain:subdomains!inner(code, status),
      education:educations(title, subtitle, description, dateFrom, dateTo, isCurrent),
      experience:experiences(title, subtitle, description, dateFrom, dateTo, isCurrent),
      settings(fullName, phoneNumber, email, address, intro, skills, languages, desiredPosition, expectedSalary, websiteDesign, image)`,
    )
    .eq("subdomains.slug", subdomain)
    .limit(1)
    .single();

export const userSettingsQuery = ({
  id,
  googleId,
}: {
  id: string;
  googleId: string;
}) =>
  supabase
    .from("users")
    .select(
      `userStatus:status, userId:id, subdomain:subdomains!inner(status),
      education:educations(id, title, subtitle, description, dateFrom, dateTo, isCurrent),
      experience:experiences(id, title, subtitle, description, dateFrom, dateTo, isCurrent),
      settings(fullName, phoneNumber, email, address, intro, skills, languages, desiredPosition, expectedSalary, websiteDesign, image)`,
    )
    .eq("id", id)
    .eq("googleId", googleId)
    .limit(1)
    .single();

export const subdomainStatusQuery = ({
  id,
  googleId,
}: {
  id: string;
  googleId: string;
}) =>
  supabase
    .from("users")
    .select(`userStatus:status, subdomain:subdomains!inner(status)`)
    .eq("id", id)
    .eq("googleId", googleId)
    .limit(1)
    .single();

export const subdomainStatusMutation = ({
  id,
  status,
}: {
  id: string;
  status: SubdomainStatus;
}) =>
  supabase
    .from("subdomains")
    .update({ status })
    .eq("user", id)
    .select("status")
    .single();

export const userDataByGoogleIdQuery = ({
  hashedGoogleId,
}: {
  hashedGoogleId: string;
}) =>
  supabase
    .from("users")
    .select("status, id, subdomain:subdomains(slug)")
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
    .select("status, id")
    .single();

export const registerSlugMutation = ({
  slug,
  userId,
}: {
  slug: string;
  userId: string;
}) =>
  supabase
    .from("subdomains")
    .insert({
      slug,
      user: userId,
    })
    .select("id, slug")
    .single();
