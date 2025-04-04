import { Subdomain, SubdomainData } from "@/types/subdomain";

export const getSubdomainFromUrl = (url: string) => {
  url = url.split(":")[0];
  url = url.replace(/^www\./, "");
  url = url.replace(".vercel", "");

  const parts = url.split(".");

  if (parts.length > 2) {
    return parts.slice(0, -2).join(".");
  }

  return null;
};

export const formatSubdomain = (subdomain: Subdomain): SubdomainData => {
  return {
    style: subdomain.style,
    slug: subdomain.slug,
  };
};
