import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { SettingsData } from "@/types/types";
import Loader from "@/components/ui/Loader";
import { HttpError } from "@/constants/http";
import NotFoundPage from "@/pages/404";
import InternalErrorPage from "@/pages/500";
import SettingsPageLayout from "@/components/layouts/SettingsPageLayout";
import { SettingsProvider } from "@/contexts/SettingsContext";
import SettingsList from "@/pages/subdomains/[slug]/nustatymai/SettingsList";
import { ToastProvider } from "@/contexts/ToastContext";

const notFoundErrors = [
  HttpError.NOT_FOUND,
  HttpError.NOT_LOGGED_IN,
  HttpError.NOT_ALLOWED,
];

const SettingsPage = () => {
  const { fetch, error, isLoading, data } = useFetch<SettingsData>({
    endpoint: "settings",
    method: "GET",
  });

  useEffect(() => {
    fetch({
      onSuccess: (data) => {
        console.log("data: ", data);
      },
      onError: (err) => {
        console.log("error: ", err);
      },
    });
  }, []);

  if (isLoading) {
    return <Loader variant="dark" />;
  }

  if (error && notFoundErrors.includes(error.code)) {
    return <NotFoundPage />;
  }

  if (error || !data) {
    return <InternalErrorPage />;
  }

  return (
    <ToastProvider>
      <SettingsProvider settingsData={data}>
        <SettingsPageLayout>
          <SettingsList />
        </SettingsPageLayout>
      </SettingsProvider>
    </ToastProvider>
  );
};

export default SettingsPage;
