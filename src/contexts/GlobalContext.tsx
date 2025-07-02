import { createContext, RefObject, useContext, useRef, useState } from "react";

interface Context {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  toggleLoginModal: () => void;
  refAdvantages: RefObject<HTMLDivElement | null>;
  refGetStarted: RefObject<HTMLDivElement | null>;
  refDesigns: RefObject<HTMLDivElement | null>;
  scrollToSection: (section: string) => void;
}

const GlobalContext = createContext<Context>({
  loginModalOpen: false,
  setLoginModalOpen: () => {},
  toggleLoginModal: () => {},
  refAdvantages: {
    current: null,
  },
  refGetStarted: {
    current: null,
  },
  refDesigns: {
    current: null,
  },
  scrollToSection: () => {},
});

const handleScroll = (element: HTMLDivElement) => {
  const headerOffset = 90;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const refAdvantages = useRef<HTMLDivElement | null>(null);
  const refGetStarted = useRef<HTMLDivElement | null>(null);
  const refDesigns = useRef<HTMLDivElement | null>(null);

  const handleSetLoginModalOpen = (val: boolean) => {
    setLoginModalOpen(val);
  };

  const handleToggleLoginModalOpen = () => {
    setLoginModalOpen((prevState) => !prevState);
  };

  const scrollToSection = (section: string) => {
    let element = undefined;

    switch (section) {
      case "advantages":
        element = refAdvantages.current;
        break;
      case "get-started":
        element = refGetStarted.current;
        break;
      case "designs":
        element = refDesigns.current;
        break;
    }

    if (element) {
      handleScroll(element);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen: handleSetLoginModalOpen,
        toggleLoginModal: handleToggleLoginModalOpen,
        refAdvantages,
        refGetStarted,
        refDesigns,
        scrollToSection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
