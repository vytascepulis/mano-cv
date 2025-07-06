import { availableCookies } from "@/contexts/CookiesContext/constants";

export function getClientCookie(name: string) {
  if (typeof document === "undefined") return;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}

export function setClientCookie(name: string, value: string) {
  const cookieOption = availableCookies.find((c) => c.name === name);
  if (!cookieOption) return null;

  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookieStr += `; max-age=${cookieOption.maxAge}; domain=${cookieOption.domain}; path=/`;
  document.cookie = cookieStr;
}
