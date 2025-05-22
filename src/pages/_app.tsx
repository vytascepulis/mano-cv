import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Outfit } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { ToastProvider } from "@/contexts/ToastContext";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const outfit = Outfit({ subsets: ["latin"] });

config.autoAddCss = false;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GlobalProvider>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <ToastProvider>
          <main className={outfit.className}>
            {getLayout(<Component {...pageProps} />)}
          </main>
        </ToastProvider>
      </SessionProvider>
    </GlobalProvider>
  );
}
