import classicDesign from "@/assets/classic.jpg";
import modernDesign from "@/assets/modern.jpg";
import minimalisticDesign from "@/assets/minimalistic.jpg";
import { getDomainUrl } from "@/utils/subdomain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface IDesignItem {
  title: string;
  description: string;
  image: string;
}

const designsList: IDesignItem[] = [
  {
    title: "Klasikinis",
    description:
      "Tvarkingas ir pažįstamas išdėstymas - kaip PDF CV, bet interaktyvus ir online",
    image: classicDesign.src,
  },
  {
    title: "Modernus",
    description:
      "Dinamiškas išdėstymas su moderniomis animacijomis ir spalvomis – puikiai tinka kūrybiškiems specialistams",
    image: modernDesign.src,
  },
  {
    title: "Minimalistinis",
    description:
      "Itin švarus dizainas su fokusu į turinį. Idealus profesionalams, norintiems paprastumo",
    image: minimalisticDesign.src,
  },
];

const DesignItem = ({ item }: { item: IDesignItem }) => {
  const index = designsList.indexOf(item) + 1;
  return (
    <a
      href={`${getDomainUrl()}/sablonai?stilius=${item.title.toLowerCase()}`}
      target="_blank"
      className="grid grid-cols-1 gap-[20px] rounded-xl border border-transparent transition-all md:grid-cols-2 md:gap-[100px] md:p-[30px] hover:md:border-gray-200 hover:md:bg-gray-50/70 hover:md:shadow-lg"
    >
      <div className="text-dark flex flex-row gap-3 md:gap-5">
        <p className="text-light bg-primary flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full text-2xl font-bold md:h-[60px] md:w-[60px] md:text-4xl">
          {index}
        </p>
        <div className="mt-[4px] flex flex-col gap-1 md:mt-[10px] md:gap-3">
          <p className="flex items-start gap-2 text-2xl font-semibold md:text-4xl">
            {item.title}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-primary mt-[6px] text-xs md:text-sm"
            />
          </p>
          <p className="text-base font-extralight md:text-lg">
            {item.description}
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
        <img src={item.image} alt="klasikinis" />
      </div>
    </a>
  );
};

const Designs = () => {
  const { refDesigns } = useGlobalContext();

  return (
    <div ref={refDesigns}>
      <h1 className="mx-auto mb-[10px] max-w-[600px] text-center text-4xl font-bold md:mb-[20px] lg:text-6xl">
        <span className="bg-linear-45 from-violet-500 to-violet-600 bg-clip-text text-transparent">
          Pasirink dizainą
        </span>
        , kuris atspindi tave
      </h1>
      <p className="mx-auto mb-[30px] text-center font-extralight text-slate-700 md:mb-[70px] md:max-w-[80%]">
        Trys unikalūs dizainai - pritaikyti skirtingiems stiliams ir poreikiams
      </p>
      <div className="flex flex-col gap-[50px]">
        {designsList.map((design, index) => (
          <DesignItem key={index} item={design} />
        ))}
      </div>
    </div>
  );
};

export default Designs;
