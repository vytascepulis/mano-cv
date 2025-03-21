import { useRouter } from "next/router";
import CodePage from "@/pages/code";
import { useEffect, useState } from "react";
import { SubdomainData } from "@/types/subdomain";
import useFetch from "@/hooks/useFetch";
import { getCookie } from "@/utils/cookies";

export default function SubdomainPage() {
  const router = useRouter();
  const { error, isLoading, fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [theme, setTheme] = useState<SubdomainData | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      fetch({
        body: {
          subdomain: router.query.slug,
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
    }
  }, [router.query.slug]);

  if (isPageLoading || isLoading) {
    return <>loading</>;
  }

  if (error?.code === 404) {
    return <>Subdomain not found</>;
  }

  if (!theme) {
    return <CodePage slug={router.query.slug as string} setTheme={setTheme} />;
  }

  return (
    <h1>
      Welcome to {router.query.slug}, theme is {theme.style}
    </h1>
  );
}
