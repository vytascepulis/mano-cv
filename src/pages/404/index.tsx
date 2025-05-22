import { getDomainUrl } from "@/utils/subdomain";
import Button from "@/components/ui/Button";
import { ReactElement } from "react";
import PlainPageLayout from "@/components/layouts/PlainPageLayout";

export default function NotFoundPage() {
  return (
    <div className="mx-auto mt-[100px] flex max-w-4xl flex-col justify-center text-center md:mt-[300px]">
      <h1 className="mb-7 text-5xl font-extrabold md:mb-5 lg:text-6xl">
        😵 404
      </h1>
      <p className="text-2xl">Oi! Toks puslapis neegzistuoja</p>
      <Button variant="link" className="mt-5" href={getDomainUrl()}>
        Grįžti į mano-cv.lt
      </Button>
    </div>
  );
}

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PlainPageLayout title="Mano-cv.lt - puslapis nerastas">
      {page}
    </PlainPageLayout>
  );
};
