import { availableCookies } from "@/contexts/CookiesContext/constants";

export type CookieName = (typeof availableCookies)[number]["name"];

export interface CookieState {
  [key: CookieName]: string | null;
}

export interface ICookieContext {
  cookies: CookieState;
  setCookie: (cookieName: CookieName, value: string) => void;
}
