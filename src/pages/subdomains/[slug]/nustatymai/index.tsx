import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { UserData } from "@/types/types";

const SettingsPage = () => {
  const { data: session } = useSession();

  const { error, isLoading, fetch } = useFetch<UserData>({
    endpoint: "settings",
    method: "POST",
  });

  useEffect(() => {
    fetch({
      onSuccess: (data) => {
        console.log("data: ", data);
      },
      onError: (err) => {
        console.log("error: ", err);
      },
    });
  }, []);

  if (!session) return <>not logged in</>;

  return (
    <>
      SEttings <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default SettingsPage;
