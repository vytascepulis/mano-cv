import { useSession } from "next-auth/react";
import { UserStatus } from "@/types/supabase.enums";
import SubdomainWizard from "@/pages/prisijungti/SubdomainWizard";
import { formatSubdomainUrl } from "@/utils/subdomain";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.subdomainSlug) {
      window.location.replace(
        `${formatSubdomainUrl(session.user.subdomainSlug)}/nustatymai`,
      );
    }
  }, [session?.user.subdomainSlug]);

  if (session?.user.status === UserStatus.INITIALIZED) {
    return <SubdomainWizard />;
  }

  return <>login/registration page</>;
};

export default LoginPage;
