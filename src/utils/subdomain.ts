import { UserData, UserWithSubdomain } from "@/types/types";

export const getSubdomainFromUrl = (url?: string) => {
  if (!url) return null;

  url = url.replace("https://", "");
  url = url.replace("http://", "");
  url = url.replace("www.", "");
  url = url.replace(".mano-cv.lt", "");
  url = url.replace("mano-cv.lt", "");
  url = url.replace(".localhost:3000", "");
  url = url.replace("localhost:3000", "");

  return url || null;
};

export const formatSubdomainUrl = (slug: string) => {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
};

export const formatUserData = (user: UserWithSubdomain): UserData => {
  return {
    id: user.id,
    status: user.status,
    subdomain: user.subdomain
      ? {
          id: user.subdomain.id,
          status: user.subdomain.status,
          slug: user.subdomain.slug,
          style: user.subdomain.style,
        }
      : null,
  };
};
