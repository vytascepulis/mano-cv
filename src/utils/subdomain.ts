import { Subdomain, SubdomainData } from "@/types/subdomain";

export const getSubdomainFromUrl = () => {
  const host = window.location.hostname;
  const sub = host.split(".");

  if (sub.length > 2 || !sub.length) {
    return null;
  }

  return sub.slice(0, 1)[0];
};

export const formatSubdomain = (subdomain: Subdomain): SubdomainData => {
  return {
    style: subdomain.style,
  };
};
