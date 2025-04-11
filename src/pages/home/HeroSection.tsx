import Button from "@/components/ui/Button";

const HeroSection = () => {
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
        <Button size="lg">Pradėti</Button>
        <Button size="lg" variant="outline">
          Žiūrėti pavyzdžius
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
