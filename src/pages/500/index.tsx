import { getDomainUrl } from "@/utils/subdomain";
import Button from "@/components/ui/Button";
import { FetchError } from "@/hooks/useFetch";
import PlainPageLayout from "@/components/layouts/PlainPageLayout";

export default function InternalErrorPage({
  error,
}: {
  error: FetchError | null;
}) {
  return (
    <PlainPageLayout title="mano-cv.lt - nenumatyta klaida">
      <div className="mx-auto mt-[100px] flex max-w-4xl flex-col justify-center text-center md:mt-[300px]">
        <h1 className="mb-7 text-5xl font-extrabold md:mb-5 lg:text-6xl">
          😵 500
        </h1>
        <p className="text-2xl">
          Oi! Nutiko kažkas ne taip... {error?.message ?? ""}
        </p>
        <Button variant="link" className="mt-5" href={getDomainUrl()}>
          Grįžti į mano-cv.lt
        </Button>
      </div>
    </PlainPageLayout>
  );
}
