import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookies";
import NotFoundPage from "@/pages/404";
import CodePage from "@/pages/subdomains/[slug]/code";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { SubdomainData } from "@/types/subdomain";

const SubdomainPageContent = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const { error, isLoading, fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [theme, setTheme] = useState<SubdomainData | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    fetch({
      body: {
        code: getCookie("code"),
      },
      onSuccess: (data) => {
        setTheme(data);
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

  if (!theme) {
    return <CodePage setTheme={setTheme} />;
  }

  return (
    <h1>
      {}
      Welcome to {slug}. Theme is {theme.style}
    </h1>
  );
};

export default SubdomainPageContent;
