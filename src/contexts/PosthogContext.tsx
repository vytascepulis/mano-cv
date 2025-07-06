import { createContext, useContext } from "react";
import posthog from "posthog-js";

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
}

const PosthogContext = createContext<Context>({
  captureEvent: () => {},
  capturePageView: () => {},
});

const PosthogProvider = ({ children }: Props) => {
  const captureEvent: Context["captureEvent"] = ({ name, options }) => {
    posthog.capture(name, options);
  };

  const capturePageView: Context["capturePageView"] = ({ name, options }) => {
    captureEvent({
      name: "Page view",
      options: { name: name, ...options },
    });
  };

  return (
    <PosthogContext.Provider value={{ captureEvent, capturePageView }}>
      {children}
    </PosthogContext.Provider>
  );
};

const usePosthogContext = () => useContext(PosthogContext);

export { PosthogProvider, usePosthogContext };
