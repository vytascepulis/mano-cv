import { signOut } from "next-auth/react";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { UserData } from "@/types/types";
import Loader from "@/components/ui/Loader";
import { HttpError } from "@/constants/http";
import NotFoundPage from "@/pages/404";
import InternalErrorPage from "@/pages/500";

const notFoundErrors = [
  HttpError.NOT_FOUND,
  HttpError.NOT_LOGGED_IN,
  HttpError.NOT_ALLOWED,
];

const SettingsPage = () => {
  const { fetch, error, isLoading } = useFetch<UserData>({
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

  if (isLoading) {
    return <Loader variant="dark" />;
  }

  if (error && notFoundErrors.includes(error.code)) {
    return <NotFoundPage />;
  }

  if (error) {
    return <InternalErrorPage />;
  }

  return (
    <>
      SEttings <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default SettingsPage;
