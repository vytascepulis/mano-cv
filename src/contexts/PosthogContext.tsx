import { createContext, useContext, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { useCookies } from "@/contexts/CookiesContext";

interface Props {
  children: React.ReactNode;
}

interface EventProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { [key: string]: any };
}

interface Context {
  captureEvent: ({ name, options }: EventProps) => void;
  capturePageView: ({ name, options }: EventProps) => void;
  posthogReady: boolean;
}

const PosthogContext = createContext<Context>({
  captureEvent: () => {},
  capturePageView: () => {},
  posthogReady: false,
});

const PosthogProvider = ({ children }: Props) => {
  const { cookies } = useCookies();
  const [posthogReady, setPosthogReady] = useState(false);
  const refEvents = useRef<EventProps[]>([]);

  const captureEvent: Context["captureEvent"] = ({ name, options }) => {
    if (process.env.NODE_ENV === "development") return;

    if (cookies.cconsent !== "true") {
      refEvents.current.push({ name, options });
      return;
    }

    posthog.capture(name, options);
  };

  const capturePageView: Context["capturePageView"] = ({ name, options }) => {
    captureEvent({
      name: "Page view",
      options: { name: name, ...options },
    });
  };

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      cookies.cconsent !== "true" ||
      process.env.NODE_ENV === "development"
    )
      return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      autocapture: false,
      disable_session_recording: true,
      disable_persistence: false,
      capture_performance: false,
      loaded: () => {
        setPosthogReady(true);
        if (refEvents.current.length > 0) {
          refEvents.current.forEach((e) => {
            captureEvent(e);
          });
        }
      },
    });
  }, [cookies.cconsent]);

  return (
    <PosthogContext.Provider
      value={{ captureEvent, capturePageView, posthogReady }}
    >
      {children}
    </PosthogContext.Provider>
  );
};

const usePosthogContext = () => useContext(PosthogContext);

export { PosthogProvider, usePosthogContext };
