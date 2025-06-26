import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { SubdomainData } from "@/types/types";
import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo-dark.png";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import { useToast } from "@/contexts/ToastContext";

interface Props {
  setSubdomainData: (data: SubdomainData) => void;
}

export default function CodePage({ setSubdomainData }: Props) {
  const { fireToast } = useToast();
  const router = useRouter();
  const slug = router.query.slug;
  const { fetch, isLoading } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [code, setCode] = useState("");

  const handleOnSubmit = () => {
    fetch({
      body: {
        code,
      },
      onSuccess: (data) => {
        setSubdomainData(data);
      },
      onError: () => {
        fireToast({ type: "error", message: "Kodas neteisingas" });
      },
    });
  };

  return (
    <>
      <div className="h-screen w-screen bg-violet-50 px-3 pt-3 lg:px-5 lg:pt-(--navbar-top)">
        <div className="mx-auto flex max-w-7xl flex-col items-start">
          <a href={getDomainUrl()}>
            <img
              src={logo.src}
              alt="mano-cv.lt logo"
              className="h-[25px] object-contain"
            />
          </a>

          <div className="mx-auto mt-[100px] flex max-w-4xl flex-col items-center text-center md:mt-[300px]">
            <h1 className="mb-3 text-4xl font-extrabold md:mb-3 lg:text-6xl">
              {slug}.mano-cv.lt
            </h1>
            <p className="text-md lg:text-xl">
              Svetainė pasiekiama tik suvedus kodą
            </p>
            <div className="mt-10 flex w-full max-w-[300px] justify-center gap-3">
              <Input
                type="text"
                inputMode="numeric"
                onChange={setCode}
                placeholder="Kodas"
              />
              <Button
                type="button"
                onClick={handleOnSubmit}
                loading={isLoading}
              >
                Atidaryti
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
