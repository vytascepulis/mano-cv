import { createContext, useContext } from "react";
import mixpanel from "mixpanel-browser";
import { IUser } from "@/pages/api/types";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN!, {
  verbose: true,
});

interface Context {
  trackEvent: (props: EventProps) => void;
  trackPageView: (props: PageViewProps) => void;
}

interface PageViewProps {
  name?: string;
}

interface EventProps {
  eventName: string;
  googleId?: IUser["googleId"];
}

const MixpanelContext = createContext<Context>({
  trackEvent: () => {},
  trackPageView: () => {},
});

const MixpanelProvider = ({ children }: { children: React.ReactNode }) => {
  const isDev = process.env.NODE_ENV === "development";

  const trackEvent = ({ eventName, googleId }: EventProps) => {
    if (isDev) return;

    mixpanel.track(eventName, {
      googleId,
    });
  };

  const trackPageView = ({ name }: PageViewProps) => {
    if (isDev) return;

    mixpanel.track("Page view", {
      pageName: name,
    });
  };

  return (
    <MixpanelContext.Provider
      value={{
        trackEvent,
        trackPageView,
      }}
    >
      {children}
    </MixpanelContext.Provider>
  );
};

const useMixpanel = () => useContext(MixpanelContext);

export { MixpanelProvider, useMixpanel };
