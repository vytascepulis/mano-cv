import Button from "@/components/ui/Button";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useSession } from "next-auth/react";
import { formatSubdomainUrl, getDomainUrl } from "@/utils/subdomain";
import { UserStatus } from "@/types/enums";

const HeroSection = () => {
  const { data } = useSession();
  const { toggleLoginModal } = useGlobalContext();

  const handleCtaOnClick = () => {
    if (!data || data.user.userStatus === UserStatus.INITIALIZED) {
      return toggleLoginModal();
    }
  };

  return (
    <section className="mx-auto flex max-w-[700px] flex-col items-center text-center">
      <h1 className="mb-7 text-4xl font-extrabold text-slate-100 md:mb-5 lg:text-6xl">
        <span className="bg-linear-45 from-violet-500 to-violet-600 bg-clip-text text-transparent">
          Modernus būdas
        </span>{" "}
        pateikti savo CV
      </h1>
      <p className="mb-15 max-w-full font-light text-slate-300 md:mb-10 md:max-w-[80%]">
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
        <Button
          size="lg"
          target="_blank"
          variant="outline"
          href={`${getDomainUrl()}/sablonai`}
        >
          Žiūrėti pavyzdžius
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
