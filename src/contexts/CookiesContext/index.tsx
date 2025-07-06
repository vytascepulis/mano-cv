import { useContext, useEffect, useRef, useState } from "react";
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
  const refCookies = useRef<CookieState>({});

  const handleSetCookie = (name: CookieName, value: string) => {
    const canSet = cookies.cconsent === "true";
    if (!canSet && name !== "cconsent") {
      refCookies.current[name] = value;
      return;
    }

    setClientCookie(name, value);
    setCookie((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setCookie(initCookies());
  }, []);

  useEffect(() => {
    if (cookies.cconsent === "true" && refCookies.current) {
      Object.entries(refCookies.current).forEach(([name, value]) => {
        if (value) {
          handleSetCookie(name, value);
        }

        delete refCookies.current[name];
      });
    }
  }, [cookies.cconsent]);

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
