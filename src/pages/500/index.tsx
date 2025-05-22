import { FetchError } from "@/hooks/useFetch";

export default function InternalErrorPage({
  error,
}: {
  error: FetchError | null;
}) {
  return <>something went wrong: {error?.message}</>;
}
