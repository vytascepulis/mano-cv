import Input from "@/components/ui/Input";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { RegisterData } from "@/types/types";
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
      onSuccess: async () => {
        setLoading(false);
        await update();
      },
      onError: (error) => {
        setLoading(false);
        console.error(error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center py-2 text-center md:py-10">
      <h1 className="text-dark mb-4 text-4xl font-extrabold md:mb-5 md:text-5xl">
        Tavo svetainės pavadinimas
      </h1>
      <p className="text-dark max-w-[400px]">
        Geras svetainės vardas leis kitiems lengviau ją įsiminti. Jo keisti
        nebegalėsi, tad neskubėk
      </p>
      <div className="mt-4 flex w-full flex-col gap-4 sm:w-[400px] sm:flex-row md:mt-10">
        <Input
          type="suffix"
          onChange={(val) => (refSlugValue.current = val)}
          suffix=".mano-cv.lt"
          placeholder="Pavadinimas"
          disabled={loading}
          className="flex-none sm:flex-1"
        />
        <Button loading={loading} onClick={handleRegisterSlug}>
          Sukurti
        </Button>
      </div>
    </div>
  );
};

export default RegisterModalContent;
