import { FetchError } from "@/hooks/useFetch";
import Head from "next/head";

export default function InternalErrorPage({
  error,
}: {
  error: FetchError | null;
}) {
  return (
    <>
      <Head>
        <title>Mano-cv.lt - klaida</title>
      </Head>
      something went wrong: {error?.message}
    </>
  );
}
