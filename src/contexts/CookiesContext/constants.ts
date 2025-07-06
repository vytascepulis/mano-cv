import { ICookieContext } from "@/contexts/CookiesContext/types";
import { createContext } from "react";

const enum CookieLevel {
  NECESSARY,
}

export const availableCookies = [
  {
    name: "cconsent",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    level: CookieLevel.NECESSARY,
    domain: ".mano-cv.lt",
  },
];

export const CookiesContext = createContext<ICookieContext>({
  cookies: {},
  setCookie: () => {},
});
