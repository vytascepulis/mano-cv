import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";
import Head from "next/head";
import { usePosthogContext } from "@/contexts/PosthogContext";

const LoginAuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { captureEvent } = usePosthogContext();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.subdomainSlug) {
        router.replace({ pathname: "/" });
        return;
      }

      captureEvent({
        name: "Registered user",
        options: { userId: session.user.userId },
      });

      router.replace({ pathname: "/", query: "status=initialized" });
    }
  }, [status, session]);

  return (
    <>
      <Head>
        <title>mano-cv.lt - autentifikacija</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center bg-violet-50">
        <Loader variant="dark" size="lg" />
      </div>
    </>
  );
};

export default LoginAuthPage;
