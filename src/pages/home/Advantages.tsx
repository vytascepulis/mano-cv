import {
  faFileContract,
  faHandHoldingHeart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "@/contexts/GlobalContext";

const advantagesList = [
  {
    title: "Visada pasiekiamas ir atnaujinamas",
    description:
      "Internetinis CV niekada neprarandamas - jis visada pasiekiamas ir lengvai atnaujinamas",
    icon: faFileContract,
  },
  {
    title: "Greitas ir paprastas pasidalinimas",
    description:
      "Pasidalinkite savo CV tiesiai su darbdaviais, partneriais ar kolegomis, nesivargindami siųsti failų ar priedų",
    icon: faHandHoldingHeart,
  },
  {
    title: "Gebėjimas išsiskirti iš kitų",
    description:
      "Internetinis CV - galimybė išsiskirti iš kitų ir parodyti savo profesionalumą",
    icon: faUsers,
  },
];

const Advantages = () => {
  const { refAdvantages } = useGlobalContext();
  return (
    <div
      ref={refAdvantages}
      className="text-dark mx-auto flex w-full max-w-[1000px] flex-col items-center justify-between gap-[30px] pb-[150px] md:gap-[60px] lg:flex-row lg:items-start lg:gap-0"
    >
      <h1 className="max-w-auto shrink-0 text-center text-4xl font-bold lg:max-w-[350px] lg:text-start lg:text-6xl">
        Kodėl verta turėti CV internete?
      </h1>
      <div className="flex max-w-[525px] flex-col gap-[10px] md:gap-[20px]">
        {advantagesList.map((advantage, index) => (
          <div
            key={index}
            className="flex flex-row overflow-hidden rounded-xl border border-gray-300 bg-gray-50 shadow-md"
          >
            <div className="bg-primary flex w-[80px] shrink-0 items-center justify-center border-r border-violet-700 p-4">
              <FontAwesomeIcon
                icon={advantage.icon}
                className="text-light text-4xl"
              />
            </div>
            <div className="px-3 py-2 md:px-5 md:py-3">
              <p className="mb-2 text-lg leading-tight font-medium md:text-2xl md:font-semibold">
                {advantage.title}
              </p>
              <p className="text-sm font-light text-slate-500 md:font-normal">
                {advantage.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
