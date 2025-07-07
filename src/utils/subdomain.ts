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

export const getDomainUrl = () => {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // return `${protocol}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return "http://localhost:3000";
};

const reservedSubdomains = new Set([
  "manocv",
  "www",
  "admin",
  "api",
  "mail",
  "ftp",
  "smtp",
  "imap",
  "pop",
  "test",
  "sandbox",
  "staging",
  "dev",
  "demo",
  "static",
  "cdn",
  "login",
  "signup",
  "signin",
  "register",
  "logout",
  "auth",
  "sso",
  "oauth",
  "password",
  "reset",
  "account",
  "user",
  "users",
  "me",
  "root",
  "adminpanel",
  "internal",
  "backend",
  "superadmin",
  "moderator",
  "staff",
  "team",
  "support",
  "contact",
  "help",
  "robots",
  "favicon",
  "sitemap",
  "config",
  "assets",
  "media",
  "images",
  "secure",
  "billing",
  "invoice",
  "bank",
  "pay",
  "payment",
  "order",
  "checkout",
]);

export function isSlugValid(subdomain: string) {
  const alphaRegex = /^[a-z]+$/;
  return (
    !subdomain.includes("www") &&
    alphaRegex.test(subdomain) &&
    !reservedSubdomains.has(subdomain)
  );
}
