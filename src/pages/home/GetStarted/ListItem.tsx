import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

export interface IListItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const ITEM_DELAY = 7000;

interface Props {
  setActive: () => void;
  isActive: boolean;
  item: IListItem;
  timerRunning: boolean;
  isMobile?: boolean;
}

const ListItem = ({
  setActive,
  isActive,
  item,
  timerRunning,
  isMobile,
}: Props) => {
  const itemClasses =
    "cursor-pointer flex flex-col justify-between bg-gray-50 transition-colors hover:bg-violet-50 select-none";
  const activeItemClasses =
    "text-slate-50 bg-linear-to-tr to-violet-500 from-violet-700";

  const itemContentClasses = "md:px-5 md:py-4 px-3 py-2";

  if (!item) return null;

  return (
    <li
      onClick={setActive}
      className={twMerge(itemClasses, isActive && activeItemClasses)}
      key={item.id}
    >
      <div className={twMerge(itemContentClasses)}>
        <p
          className={twMerge(
            "mb-1 text-base font-normal md:mb-2 md:text-lg md:font-light",
            isActive && "font-semibold!",
          )}
        >
          {item.title}
        </p>
        <p
          className={twMerge(
            "text-sm font-light text-slate-500 md:font-normal",
            isActive && "text-slate-50",
          )}
        >
          {item.description}
        </p>
      </div>
      <div
        className={twMerge(
          "h-[2px] w-full bg-violet-700 md:h-[8px]",
          !isActive && "bg-transparent",
        )}
      >
        {isActive && (
          <div
            style={{ animationDuration: `${ITEM_DELAY}ms` }}
            className={twMerge(
              style.progress,
              !timerRunning && style.paused,
              `bg-light h-full`,
            )}
          />
        )}
      </div>
      {isMobile && (
        <div
          className={twMerge(
            "h-auto shrink-0 grow-0 overflow-hidden md:h-[350px]",
          )}
        >
          <img
            className={twMerge(
              isActive ? "block" : "hidden",
              "max-h-full w-full object-cover object-top",
            )}
            src={item.image}
            alt={item.id}
          />
        </div>
      )}
    </li>
  );
};

export default ListItem;
