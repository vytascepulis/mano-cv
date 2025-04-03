import NotFoundPage from "@/pages/404";
import { useAuth } from "@/contexts/AuthContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const { token } = useAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const slug = router.query.slug;
  // if (!token) {
  //   return <NotFoundPage />;
  // }

  if (!session) {
    return (
      <>
        {slug}
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  return (
    <>
      SEttings <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default SettingsPage;
