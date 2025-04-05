import { Subdomain, SubdomainData } from "@/types/subdomain";

export const getSubdomainFromUrl = (url: string) => {
  url = url.replace("https://", "");
  url = url.replace("http://", "");
  url = url.replace("www.", "");
  url = url.replace(".mano-cv.lt", "");
  url = url.replace("mano-cv.lt", "");
  url = url.replace(".localhost:3000", "");
  url = url.replace("localhost:3000", "");

  return url || null;
};

export const formatSubdomain = (subdomain: Subdomain): SubdomainData => {
  return {
    style: subdomain.style,
    slug: subdomain.slug,
  };
};
