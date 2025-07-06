import * as Sentry from "@sentry/nextjs";
import "@/sentry.client.config.ts";
import { createContext, useContext, useEffect } from "react";

interface ErrorOptions {
  message: string;
  level?: Sentry.SeverityLevel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: { [key: string]: any };
}

interface Context {
  logError: ({ message }: ErrorOptions) => void;
}

const SentryContext = createContext<Context>({
  logError: () => {},
});

const SentryProvider = ({ children }: { children: React.ReactNode }) => {
  const logError = ({ message, level = "error", extra }: ErrorOptions) => {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_SENTRY_TRACK_DEV !== "true"
    ) {
      return;
    }

    Sentry.captureEvent({
      message,
      level,
      extra,
    });
  };

  return (
    <SentryContext.Provider value={{ logError }}>
      <Sentry.ErrorBoundary>{children}</Sentry.ErrorBoundary>
    </SentryContext.Provider>
  );
};

const LogError = ({ message, level, extra }: ErrorOptions) => {
  const { logError } = useSentry();

  useEffect(() => {
    logError({ message, level, extra });
  }, []);

  return null;
};

const useSentry = () => useContext(SentryContext);

export { useSentry, SentryProvider, LogError };
