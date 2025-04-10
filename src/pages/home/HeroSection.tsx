import Button from "@/components/ui/Button";

const HeroSection = () => {
  return (
    <section className="text-light mx-auto flex max-w-[700px] flex-col items-center text-center">
      <h1 className="mb-5 text-6xl font-extrabold">
        Modernus būdas pateikti savo CV
      </h1>
      <p className="mb-10 max-w-[80%] font-light">
        Profesionalus CV internete vos per kelias minutes. Nemokamai susikurk
        savo asmeninę svetainę, kuria galėsi pasidalinti tik su pasirinktais
        žmonėmis
      </p>
      <div className="flex justify-center gap-3">
        <Button size="lg">Pradėti</Button>
        <Button size="lg" variant="outline">
          Žiūrėti pavyzdžius
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
