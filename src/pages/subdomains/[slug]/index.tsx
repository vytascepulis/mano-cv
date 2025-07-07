import { useEffect, useState } from "react";
import NotFoundPage from "@/pages/404";
import CodePage from "@/pages/subdomains/[slug]/code";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { SubdomainData } from "@/types/types";
import LandingPage from "@/pages/subdomains/[slug]/landing";
import InternalErrorPage from "@/pages/500";
import { HttpError } from "@/constants/http";
import Button from "@/components/ui/Button";

const SubdomainPage = () => {
  const { error, isLoading, fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [subdomainData, setSubdomainData] = useState<SubdomainData | null>(
    null,
  );
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    fetch({
      onSuccess: (data) => {
        setSubdomainData(data);
        setIsPageLoading(false);
      },
      onError: () => {
        setIsPageLoading(false);
      },
    });
  }, []);

  if (isPageLoading || isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-violet-50">
        <Loader variant="dark" size="lg" />
      </div>
    );
  }

  if (error?.code === HttpError.NOT_FOUND) {
    return <NotFoundPage />;
  }

  if (error?.code === HttpError.NOT_ALLOWED) {
    return (
      <NotFoundPage
        customMessage={
          <div className="mb-5 rounded-lg bg-red-300 p-3 text-sm">
            Tavo svetainė paslėpta. Aktyvuok ją{" "}
            <Button
              variant="link"
              className="my-0! inline-block max-h-max py-0!"
              href="/profilis"
            >
              savo profilyje
            </Button>
          </div>
        }
      />
    );
  }

  if (error && error?.code !== HttpError.BAD_REQUEST) {
    return <InternalErrorPage error={error} />;
  }

  if (!subdomainData) {
    return <CodePage setSubdomainData={setSubdomainData} />;
  }

  return <LandingPage subdomainData={subdomainData} />;
};

export default SubdomainPage;
