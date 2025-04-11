import { createContext, useContext, useState } from "react";

interface Context {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  toggleLoginModal: () => void;
}

const GlobalContext = createContext<Context>({
  loginModalOpen: false,
  setLoginModalOpen: () => {},
  toggleLoginModal: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleSetLoginModalOpen = (val: boolean) => {
    setLoginModalOpen(val);
  };

  const handleToggleLoginModalOpen = () => {
    setLoginModalOpen((prevState) => !prevState);
  };

  return (
    <GlobalContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen: handleSetLoginModalOpen,
        toggleLoginModal: handleToggleLoginModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
