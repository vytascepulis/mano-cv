import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { SettingsData } from "@/types/types";
import Loader from "@/components/ui/Loader";
import { HttpError } from "@/constants/http";
import NotFoundPage from "@/pages/404";
import InternalErrorPage from "@/pages/500";
import SettingsPageLayout from "@/components/layouts/SettingsPageLayout";
import { SettingsProvider } from "@/contexts/SettingsContext";
import SettingsList from "@/pages/subdomains/[slug]/profilis/SettingsList";
import { LogError } from "@/contexts/SentryContext";

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
    fetch({});
  }, []);

  if (isLoading || (!error && !data)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader variant="dark" size="lg" />
      </div>
    );
  }

  if (error && notFoundErrors.includes(error.code)) {
    return (
      <>
        <LogError message={"Could not load settings page"} extra={{ error }} />
        <NotFoundPage />
      </>
    );
  }

  if (error || !data) {
    return <InternalErrorPage error={error} />;
  }

  return (
    <SettingsProvider settingsData={data}>
      <SettingsPageLayout>
        <SettingsList />
      </SettingsPageLayout>
    </SettingsProvider>
  );
};

export default SettingsPage;
