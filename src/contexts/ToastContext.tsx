import { createContext, ReactNode, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Toast {
  type: "success" | "error";
  message: string;
}

interface Context {
  fireToast: (toast: Toast) => void;
}

const ToastContext = createContext<Context>({
  fireToast: () => {},
});

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const fireToast = ({ type, message }: Toast) => {
    if (type === "success") {
      toast.success(message);
    }

    if (type === "error") {
      toast.error(message, {});
    }
  };

  return (
    <ToastContext.Provider
      value={{
        fireToast,
      }}
    >
      {children}
      <Toaster
        position="bottom-center"
        containerStyle={{ bottom: "50px" }}
        toastOptions={{
          success: {
            style: {
              background: "var(--color-green-500)",
              color: "var(--color-light)",
            },
            iconTheme: {
              primary: "var(--color-light)",
              secondary: "var(--color-green-500)",
            },
          },
          error: {
            style: {
              background: "var(--color-red-500)",
              color: "var(--color-light)",
            },
            iconTheme: {
              primary: "var(--color-light)",
              secondary: "var(--color-red-500)",
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
