import { useEffect, useRef, useState } from "react";
import ListItem, {
  IListItem,
  ITEM_DELAY,
} from "@/pages/home/GetStarted/ListItem";
import { useGlobalContext } from "@/contexts/GlobalContext";
import registerImg from "@/assets/register.jpg";
import enterDataImg from "@/assets/enter-data.jpg";
import activateImg from "@/assets/activate.jpg";

const itemsList: IListItem[] = [
  {
    id: "register",
    title: "Užsiregistruok",
    description: "Prisijunk per Google ir sukurk savo svetainės pavadinimą",
    image: registerImg.src,
  },
  {
    id: "enter-data",
    title: "Suvesk duomenis",
    description: "Užpildyk būtinus laukelius apie save",
    image: enterDataImg.src,
  },
  {
    id: "activate",
    title: "Pasidalink savo puslapiu",
    description: "Aktyvuok svetainę ir nusiųsk nuorodą darbdaviams",
    image: activateImg.src,
  },
];

const GetStarted = () => {
  const { refGetStarted } = useGlobalContext();
  const [activeItem, setActiveItem] = useState<IListItem>(itemsList[0]);
  const [isPaused, setIsPaused] = useState(false);
  const refTimer = useRef<number | null>(null);
  const refActiveItem = useRef<IListItem>(itemsList[0]);
  const refStartingTimer = useRef(0);
  const refRemainingTimer = useRef(ITEM_DELAY);

  const onResume = () => {
    setIsPaused(false);
    startTimer();
  };

  const onPause = () => {
    setIsPaused(true);
    window.clearTimeout(refTimer.current!);
    const elapsed = Date.now() - refStartingTimer.current;
    refRemainingTimer.current -= elapsed;
  };

  const setNextItem = () => {
    const activeIdx = itemsList.findIndex(
      (service) => service.id === refActiveItem.current.id,
    );

    const nextItem = itemsList[activeIdx + 1] ?? itemsList[0];
    setActiveItem(nextItem);
    refActiveItem.current = nextItem;
  };

  const startTimer = () => {
    if (refTimer.current) {
      window.clearTimeout(refTimer.current);
    }

    refStartingTimer.current = Date.now();

    refTimer.current = window.setTimeout(() => {
      refRemainingTimer.current = ITEM_DELAY;

      setNextItem();
      startTimer();
    }, refRemainingTimer.current);
  };

  const handleSetActive = (item: IListItem) => {
    onPause();
    refActiveItem.current = item;
    setActiveItem(item);
    refStartingTimer.current = 0;
    refRemainingTimer.current = ITEM_DELAY;
    onResume();
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div ref={refGetStarted} className="mx-auto w-full max-w-[1000px]">
      <h1 className="mb-[30px] text-center text-4xl font-bold md:mb-[70px] lg:text-6xl">
        Kaip pradėti?
      </h1>
      <div className="box-content grid min-h-[100px] grid-rows-[max-content_min-content] overflow-hidden rounded-xl border border-gray-200 shadow-lg md:grid-cols-[5fr_2fr]">
        <div className="h-auto shrink-0 grow-0 border-r-0 border-b border-slate-300 md:h-[350px] md:border-r md:border-b-0">
          <img
            className="max-h-full w-full object-cover object-center"
            src={activeItem.image}
            alt={activeItem.id}
          />
        </div>
        <ul className="grid w-full divide-y divide-slate-300 bg-slate-100 shadow-2xl">
          {itemsList.map((item) => {
            if (!item) return null;

            const isActive = item.id === activeItem.id;
            return (
              <ListItem
                key={item.id}
                item={item}
                isActive={isActive}
                setActive={() => handleSetActive(item)}
                isPaused={isPaused}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default GetStarted;
