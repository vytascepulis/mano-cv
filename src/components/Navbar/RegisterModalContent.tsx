import Input from "@/components/ui/Input";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { RegisterData } from "@/types/types";
import { formatSubdomainUrl } from "@/utils/subdomain";
import { useSession } from "next-auth/react";

const RegisterModalContent = () => {
  const { update } = useSession();
  const refSlugValue = useRef("");
  const [loading, setLoading] = useState(false);

  const { fetch } = useFetch<RegisterData>({
    endpoint: "register",
    method: "POST",
  });

  const handleRegisterSlug = () => {
    setLoading(true);
    fetch({
      body: {
        slug: refSlugValue.current,
      },
      onSuccess: async (data) => {
        setLoading(false);

        if (window) {
          const newSession = await update();
          if (newSession?.user.subdomainSlug) {
            window.location.href = `${formatSubdomainUrl(data.slug)}/nustatymai`;
          }
        }
      },
      onError: (error) => {
        setLoading(false);
        console.error(error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <h1 className="text-dark mb-5 text-5xl font-extrabold">
        Tavo svetainės pavadinimas
      </h1>
      <p className="text-dark max-w-[400px]">
        Geras svetainės vardas leis kitiems lengviau ją įsiminti. Jo keisti
        nebegalėsi, tad neskubėk
      </p>
      <div className="mt-10 flex w-[400px] flex-row gap-4">
        <Input
          type="suffix"
          onChange={(val) => (refSlugValue.current = val)}
          suffix=".mano-cv.lt"
          placeholder="Pavadinimas"
          disabled={loading}
        />
        <Button loading={loading} onClick={handleRegisterSlug}>
          Sukurti
        </Button>
      </div>
    </div>
  );
};

export default RegisterModalContent;
