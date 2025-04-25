import { createContext, ReactNode, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Toast {
  type: "success" | "error";
  message: string;
}

interface PromiseToast {
  promise: Promise<unknown>;
  successMessage: string;
  errorMessage: string;
}

interface Context {
  fireToast: (toast: Toast) => void;
  firePromiseToast: (toast: PromiseToast) => void;
}

const ToastContext = createContext<Context>({
  fireToast: () => {},
  firePromiseToast: () => {},
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

  const firePromiseToast = ({
    promise,
    successMessage,
    errorMessage,
  }: PromiseToast) => {
    toast.promise(promise, {
      loading: "Kraunasi...",
      success: successMessage,
      error: errorMessage,
    });
  };

  return (
    <ToastContext.Provider
      value={{
        fireToast,
        firePromiseToast,
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
