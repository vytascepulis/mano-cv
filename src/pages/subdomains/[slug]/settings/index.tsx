import NotFoundPage from "@/pages/404";
import { useAuth } from "@/contexts/AuthContext";
import { signIn, signOut, useSession } from "next-auth/react";

const SettingsPage = () => {
  const { token } = useAuth();
  const { data: session } = useSession();
  console.log(session);
  // if (!token) {
  //   return <NotFoundPage />;
  // }

  if (!session) {
    return (
      <>
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
