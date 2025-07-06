import posthog from "posthog-js";

const initPostHog = () => {
  if (typeof window === "undefined") return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    autocapture: false,
    disable_session_recording: true,
    disable_persistence: false,
    capture_performance: false,
  });
};

initPostHog();
