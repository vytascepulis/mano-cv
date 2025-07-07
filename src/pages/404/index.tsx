import { getDomainUrl } from "@/utils/subdomain";
import Button from "@/components/ui/Button";
import PlainPageLayout from "@/components/layouts/PlainPageLayout";

interface Props {
  customMessage?: React.ReactNode;
}

export default function NotFoundPage({ customMessage }: Props) {
  return (
    <PlainPageLayout title="mano-cv.lt - puslapis nerastas">
      <div className="mx-auto mt-[100px] flex max-w-4xl flex-col items-center text-center md:mt-[300px]">
        {customMessage && customMessage}
        <h1 className="mb-7 text-5xl font-extrabold md:mb-5 lg:text-6xl">
          😵 404
        </h1>
        <p className="text-2xl">Oi! Toks puslapis neegzistuoja</p>
        <Button variant="link" className="mt-5" href={getDomainUrl()}>
          Grįžti į mano-cv.lt
        </Button>
      </div>
    </PlainPageLayout>
  );
}
