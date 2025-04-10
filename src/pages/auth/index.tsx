import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { formatSubdomainUrl } from "@/utils/subdomain";

const LoginAuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.replace({ pathname: "/", query: "status=initialized" });
    if (status === "authenticated") {
      if (session.user.subdomainSlug) {
        router.replace(
          `${formatSubdomainUrl(session.user.subdomainSlug)}/nustatymai`,
        );
        return;
      }

      router.replace({ pathname: "/", query: "status=initialized" });
    }
  }, [status, session]);

  return null;
};

export default LoginAuthPage;
