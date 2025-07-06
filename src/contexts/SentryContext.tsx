import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.0,
});

const SentryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default SentryProvider;
