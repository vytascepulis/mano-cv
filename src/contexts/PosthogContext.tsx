import { createContext, useContext } from "react";
import posthog from "posthog-js";

interface Props {
  children: React.ReactNode;
}

interface Options {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Context {
  captureEvent: ({
    name,
    options,
  }: {
    name: string;
    options?: Options;
  }) => void;
  capturePageView: ({ name }: { name: string }) => void;
}

const PosthogContext = createContext<Context>({
  captureEvent: () => {},
  capturePageView: () => {},
});

const PosthogProvider = ({ children }: Props) => {
  const captureEvent: Context["captureEvent"] = ({ name, options }) => {
    posthog.capture(name, options);
  };

  const capturePageView = ({ name }: { name: string }) => {
    captureEvent({
      name: "Page view",
      options: { name: name },
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
