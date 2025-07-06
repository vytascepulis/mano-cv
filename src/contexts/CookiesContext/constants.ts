import { ICookieContext } from "@/contexts/CookiesContext/types";
import { createContext } from "react";

export const availableCookies = [
  {
    name: "cconsent",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    domain: process.env.NODE_ENV === "production" ? ".mano-cv.lt" : "",
  },
  {
    name: "code",
    maxAge: 60 * 60 * 24, // 24 hours
    domain: "",
  },
];

export const CookiesContext = createContext<ICookieContext>({
  cookies: {},
  setCookie: () => {},
});
