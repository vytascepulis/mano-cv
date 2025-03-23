import { createContext, useContext, useState } from "react";

interface AuthData {
  token: string | null;
}

interface ContextData extends AuthData {
  setToken: (token: string) => void;
}

const AuthContext = createContext<ContextData>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AuthData>({ token: null });

  const setToken = (token: string) => {
    setData((prevState) => ({ ...prevState, token }));
  };

  const context = {
    ...data,
    setToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
