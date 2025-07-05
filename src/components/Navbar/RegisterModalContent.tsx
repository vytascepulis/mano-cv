import Input from "@/components/ui/Input";
import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { RegisterData } from "@/types/types";
import { useSession } from "next-auth/react";
import { isSlugValid } from "@/utils/subdomain";
import { usePosthogContext } from "@/contexts/PosthogContext";

const RegisterModalContent = () => {
  const { captureEvent } = usePosthogContext();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("");

  const { fetch } = useFetch<RegisterData>({
    endpoint: "register",
    method: "POST",
  });

  const handleRegisterSlug = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const value = slug.trim();

    if (value.length < 4) {
      setError("Svetainės pavadinimas turi būti ilgesnis nei 4 simboliai");
      return;
    }

    if (value.length > 16) {
      setError("Svetainės pavadinimas turi būti trumpesnis nei 16 simbolių");
      return;
    }

    if (!isSlugValid(value)) {
      setError("Svetainės pavadinimas negali turėti skaičių ar simbolių");
      return;
    }

    setLoading(true);

    fetch({
      body: {
        slug: value,
      },
      onSuccess: async ({ id, slug, userStatus }) => {
        captureEvent({
          name: "Registered slug",
          options: { slug, userId: id },
        });

        update({ subdomainSlug: slug, userStatus }).then(() => {
          setLoading(false);
        });
      },
      onError: (error) => {
        setError(error.message);
        setLoading(false);
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
          onChange={(val) => setSlug(val.toLowerCase())}
          defaultValue={slug}
          suffix=".mano-cv.lt"
          placeholder="Pavadinimas"
          disabled={loading}
          className="flex-none sm:flex-1"
        />
        <Button type="submit" loading={loading}>
          Sukurti
        </Button>
      </form>

      {error && (
        <div className="text-dark mt-4 w-full rounded-xs bg-red-300 px-4 py-2 text-start text-sm font-semibold shadow-sm sm:w-[400px]">
          {error}
        </div>
      )}
    </div>
  );
};

export default RegisterModalContent;
