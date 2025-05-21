import Button from "@/components/ui/Button";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useSession } from "next-auth/react";
import { formatSubdomainUrl } from "@/utils/subdomain";
import { UserStatus } from "@/types/enums";

const HeroSection = () => {
  const { data } = useSession();
  const { toggleLoginModal } = useGlobalContext();

  const handleCtaOnClick = () => {
    if (!data || data.user.status === UserStatus.INITIALIZED) {
      return toggleLoginModal();
    }
  };

  return (
    <section className="text-light mx-auto flex max-w-[700px] flex-col items-center text-center">
      <h1 className="mb-7 text-4xl font-extrabold md:mb-5 lg:text-6xl">
        Modernus būdas pateikti savo CV
      </h1>
      <p className="mb-15 max-w-full font-light md:mb-10 md:max-w-[80%]">
        Profesionalus CV internete vos per kelias minutes. Nemokamai susikurk
        savo asmeninę svetainę, kuria galėsi pasidalinti tik su pasirinktais
        žmonėmis
      </p>
      <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
        <Button
          size="lg"
          onClick={handleCtaOnClick}
          href={
            data?.user.subdomainSlug
              ? `${formatSubdomainUrl(data.user.subdomainSlug)}/nustatymai`
              : undefined
          }
        >
          Pradėti
        </Button>
        <Button size="lg" variant="outline" href="/#sablonai">
          Žiūrėti pavyzdžius
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
