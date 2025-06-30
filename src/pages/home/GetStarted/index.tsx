import { useEffect, useRef, useState } from "react";
import { IListItem } from "@/pages/home/GetStarted/types";
import { ITEM_DELAY, servicesList } from "@/pages/home/GetStarted/constants";
import ListItem from "@/pages/home/GetStarted/ListItem";
import { useGlobalContext } from "@/contexts/GlobalContext";

const GetStarted = () => {
  const { refGetStarted } = useGlobalContext();
  const [activeItem, setActiveItem] = useState<IListItem>(servicesList[0]);
  const [isPaused, setIsPaused] = useState(false);
  const refTimer = useRef<number | null>(null);
  const refActiveItem = useRef<IListItem>(servicesList[0]);
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
    const activeIdx = servicesList.findIndex(
      (service) => service.id === refActiveItem.current.id,
    );

    const nextItem = servicesList[activeIdx + 1] ?? servicesList[0];
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
          {servicesList.map((service) => {
            const isActive = service.id === activeItem.id;
            return (
              <ListItem
                key={service.id}
                item={service}
                isActive={isActive}
                setActive={() => handleSetActive(service)}
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
