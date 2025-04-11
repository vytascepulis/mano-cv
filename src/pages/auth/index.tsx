import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginAuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.subdomainSlug) {
        router.replace({ pathname: "/" });
        return;
      }

      router.replace({ pathname: "/", query: "status=initialized" });
    }
  }, [status, session]);

  return null;
};

export default LoginAuthPage;
