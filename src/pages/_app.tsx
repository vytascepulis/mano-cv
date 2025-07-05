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
import Head from "next/head";
import { PosthogProvider } from "@/contexts/PosthogContext";

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
    <>
      <Head>
        <meta
          property="og:title"
          content="mano-cv.lt - susikurk savo CV svetainę"
        />
        <meta
          property="og:description"
          content="Profesionalus CV internete vos per kelias minutes. Nemokamai susikurk savo asmeninę svetainę, kuria galėsi pasidalinti tik su pasirinktais žmonėmis"
        />
        <meta property="og:image" content="https://mano-cv.lt/og-image.jpg" />
        <meta property="og:url" content="https://mano-cv.lt" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="mano-cv.lt - susikurk savo CV svetainę"
        />
        <meta
          name="twitter:description"
          content="Profesionalus CV internete vos per kelias minutes. Nemokamai susikurk savo asmeninę svetainę, kuria galėsi pasidalinti tik su pasirinktais žmonėmis"
        />
        <meta
          name="twitter:image"
          content="https://mano-cv.lt/mano-cv-logo.png"
        />
      </Head>
      <PosthogProvider>
        <GlobalProvider>
          <SessionProvider session={session} refetchOnWindowFocus={false}>
            <ToastProvider>
              <main className={outfit.className}>
                {getLayout(<Component {...pageProps} />)}
              </main>
            </ToastProvider>
          </SessionProvider>
        </GlobalProvider>
      </PosthogProvider>
    </>
  );
}
