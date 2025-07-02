import { useEffect, useRef, useState } from "react";
import ListItem, {
  IListItem,
  ITEM_DELAY,
} from "@/pages/home/GetStarted/ListItem";
import { useGlobalContext } from "@/contexts/GlobalContext";
import registerImg from "@/assets/register.jpg";
import enterDataImg from "@/assets/enter-data.jpg";
import activateImg from "@/assets/activate.jpg";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useBreakpoint from "@/hooks/useBreakpoint";
import useElementSize from "@/hooks/useElementSize";

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
  const refTimerStarted = useRef(false);
  const refTimer = useRef<number | null>(null);
  const refActiveItem = useRef<IListItem>(itemsList[0]);
  const [timerRunning, setTimerRunning] = useState(false);

  const { refElement: refItemsList, size, calculate } = useElementSize();

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

    refTimer.current = window.setTimeout(() => {
      setNextItem();
      startTimer();
    }, ITEM_DELAY);
  };

  const { refElement } = useIntersectionObserver({
    options: {
      threshold: 0.8,
    },
    onEnter: () => {
      if (!refTimerStarted.current) {
        refTimerStarted.current = true;
        setTimerRunning(true);
        startTimer();
      }
    },
  });

  const handleSetActive = (item: IListItem) => {
    refActiveItem.current = item;
    setActiveItem(item);
    startTimer();
  };

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "sm";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      calculate();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={(ref) => {
        refGetStarted.current = ref;
        refElement.current = ref;
      }}
      className="mx-auto w-full max-w-[1000px]"
    >
      <h1 className="mb-[10px] text-center text-4xl font-bold md:mb-[20px] lg:text-6xl">
        Pradėk{" "}
        <span className="bg-linear-45 from-violet-500 to-violet-600 bg-clip-text text-transparent">
          greitai ir paprastai
        </span>
      </h1>
      <p className="mx-auto mb-[30px] text-center font-extralight text-slate-700 md:mb-[70px] md:max-w-[80%]">
        Vos keliais paspaudimais susikurk savo profesionalų internetinį CV
      </p>
      <div className="box-content grid min-h-[100px] grid-rows-[max-content_min-content] overflow-hidden rounded-xl border border-gray-200 shadow-lg md:grid-cols-[5fr_2fr]">
        {!isMobile && (
          <div className="max-h-full shrink-0 grow-0 border-r-0 border-b border-slate-300 md:border-r md:border-b-0 lg:max-h-[350px]">
            <img
              className="h-full max-h-full w-full object-cover"
              src={activeItem.image}
              alt={activeItem.id}
            />
          </div>
        )}
        <ul
          ref={(ref) => {
            refItemsList.current = ref;
          }}
          style={{
            minHeight: size?.height,
          }}
          className="grid w-full divide-y divide-slate-300 bg-slate-100 shadow-2xl"
        >
          {itemsList.map((item) => {
            if (!item) return null;

            const isActive = item.id === activeItem.id;
            return (
              <ListItem
                key={item.id}
                item={item}
                isActive={isActive}
                setActive={() => handleSetActive(item)}
                timerRunning={timerRunning}
                isMobile={isMobile}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default GetStarted;
