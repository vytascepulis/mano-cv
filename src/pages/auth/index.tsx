import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";

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

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader variant="dark" size="lg" />
    </div>
  );
};

export default LoginAuthPage;
