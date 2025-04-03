import { Subdomain, SubdomainData } from "@/types/subdomain";

export const getSubdomainFromUrl = (url?: string) => {
  if (!url) return null;
  const currentHost = url
    .split(".")[0]
    .replace("http://", "")
    .replace("https://", "");

  if (currentHost === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) return null;

  return currentHost;
};

export const formatSubdomain = (subdomain: Subdomain): SubdomainData => {
  return {
    style: subdomain.style,
    slug: subdomain.slug,
  };
};
