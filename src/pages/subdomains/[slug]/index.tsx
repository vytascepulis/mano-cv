import { useEffect, useState } from "react";
import NotFoundPage from "@/pages/404";
import CodePage from "@/pages/subdomains/[slug]/code";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { SubdomainData } from "@/types/types";
import { getCookie } from "@/utils/cookies";

const SubdomainPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const { error, isLoading, fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [subdomainData, setSubdomainData] = useState<SubdomainData | null>(
    null,
  );
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const codeCookie = getCookie("code");
    if (!codeCookie) {
      setIsPageLoading(false);
      return;
    }

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

  if (error?.code === 404) {
    return <NotFoundPage />;
  }

  if (!subdomainData) {
    return <CodePage setSubdomainData={setSubdomainData} />;
  }

  return (
    <h1>
      Welcome to {slug}. Theme is {subdomainData.websiteDesign}
    </h1>
  );
};

export default SubdomainPage;
