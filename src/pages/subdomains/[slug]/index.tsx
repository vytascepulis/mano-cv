import { useEffect, useState } from "react";
import NotFoundPage from "@/pages/404";
import CodePage from "@/pages/subdomains/[slug]/code";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { SubdomainData } from "@/types/types";
import { useMixpanel } from "@/contexts/MixpanelContext";
import { getCookie } from "@/utils/cookies";
import LandingPage from "@/pages/subdomains/[slug]/landing";

const SubdomainPage = () => {
  const { trackPageView } = useMixpanel();
  const { error, isLoading, fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [subdomainData, setSubdomainData] = useState<SubdomainData | null>(
    null,
  );
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const code = getCookie("code");
    if (!code) {
      setIsPageLoading(false);
    } else {
      fetch({
        onSuccess: (data) => {
          setSubdomainData(data);
          setIsPageLoading(false);
        },
        onError: () => {
          setIsPageLoading(false);
        },
      });
    }

    trackPageView({ name: "Subdomain page" });
  }, []);

  if (isPageLoading || isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-violet-50">
        <Loader variant="dark" size="lg" />
      </div>
    );
  }

  if (error?.code === 404) {
    return <NotFoundPage />;
  }

  if (!subdomainData) {
    return <CodePage setSubdomainData={setSubdomainData} />;
  }

  return <LandingPage subdomainData={subdomainData} />;
};

export default SubdomainPage;
