import { useContext, useEffect, useState } from "react";
import { CookieName, CookieState } from "@/contexts/CookiesContext/types";
import {
  availableCookies,
  CookiesContext,
} from "@/contexts/CookiesContext/constants";
import {
  getClientCookie,
  setClientCookie,
} from "@/contexts/CookiesContext/utils";

const defaultCookies = () => {
  const cookies: CookieState = {};

  availableCookies.forEach((cookie) => {
    cookies[cookie.name] = null;
  });

  return cookies;
};

const initCookies = () => {
  const cookies: CookieState = {};

  availableCookies.forEach((cookie) => {
    const val = getClientCookie(cookie.name);

    if (val) {
      cookies[cookie.name] = val;
    }
  });

  return cookies;
};

const CookiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie] = useState<CookieState>(defaultCookies());

  const handleSetCookie = (name: CookieName, value: string) => {
    setClientCookie(name, value);
    setCookie((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setCookie(initCookies());
  }, []);

  return (
    <CookiesContext.Provider
      value={{
        cookies,
        setCookie: handleSetCookie,
      }}
    >
      {children}
    </CookiesContext.Provider>
  );
};

const useCookies = () => useContext(CookiesContext);

export { CookiesProvider, useCookies };
