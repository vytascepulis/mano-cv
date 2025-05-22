import Input from "@/components/ui/Input";
import { FormEvent, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { RegisterData } from "@/types/types";
import { useSession } from "next-auth/react";
import { useToast } from "@/contexts/ToastContext";
import { isSlugValid } from "@/utils/subdomain";

const RegisterModalContent = () => {
  const { fireToast } = useToast();
  const { update } = useSession();
  const refSlugValue = useRef("");
  const [loading, setLoading] = useState(false);

  const { fetch } = useFetch<RegisterData>({
    endpoint: "register",
    method: "POST",
  });

  const handleRegisterSlug = (e: FormEvent) => {
    e.preventDefault();

    const value = refSlugValue.current.trim();

    if (!isSlugValid(value)) {
      fireToast({
        type: "error",
        message: "Svetainės pavadinimas negali turėti skaičių ar simbolių",
      });
      return;
    }

    if (value.length < 4) {
      fireToast({
        type: "error",
        message: "Svetainės pavadinimas turi būti ilgesnis nei 4 simboliai",
      });
      return;
    }

    if (value.length > 16) {
      fireToast({
        type: "error",
        message: "Svetainės pavadinimas turi būti trumpesnis nei 16 simbolių",
      });
      return;
    }

    setLoading(true);
    fetch({
      body: {
        slug: value,
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
      <form
        onSubmit={handleRegisterSlug}
        className="mt-4 flex w-full flex-col gap-4 sm:w-[400px] sm:flex-row md:mt-10"
      >
        <Input
          type="suffix"
          onChange={(val) => (refSlugValue.current = val)}
          suffix=".mano-cv.lt"
          placeholder="Pavadinimas"
          disabled={loading}
          className="flex-none sm:flex-1"
        />
        <Button type="submit" loading={loading}>
          Sukurti
        </Button>
      </form>
    </div>
  );
};

export default RegisterModalContent;
