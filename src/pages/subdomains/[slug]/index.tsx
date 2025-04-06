import { useEffect, useState } from "react";
import NotFoundPage from "@/pages/404";
import CodePage from "@/pages/subdomains/[slug]/code";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { SubdomainData, UserData } from "@/types/types";

const SubdomainPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const { error, isLoading, fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [subdomainData, setSubdomainData] =
    useState<UserData["subdomain"]>(null);
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
    return <>loading</>;
  }

  if (error?.code === 404) {
    return <NotFoundPage />;
  }

  if (!subdomainData) {
    return <CodePage setSubdomainData={setSubdomainData} />;
  }

  return (
    <h1>
      {}
      Welcome to {slug}. Theme is {subdomainData.style}
    </h1>
  );
};

export default SubdomainPage;
