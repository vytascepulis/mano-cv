import { IListItem } from "@/pages/home/GetStarted/types";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";
import { ITEM_DELAY } from "@/pages/home/GetStarted/constants";

interface Props {
  setActive: () => void;
  isActive: boolean;
  isPaused: boolean;
  item: IListItem;
}

const ListItem = ({ setActive, isActive, isPaused, item }: Props) => {
  const itemClasses =
    "cursor-pointer flex flex-col justify-between bg-violet-50 transition-colors hover:bg-violet-100";
  const activeItemClasses = "bg-primary text-slate-50 hover:bg-primary";

  const itemContentClasses = "md:px-5 md:py-4 px-3 py-2";

  return (
    <li
      onClick={setActive}
      className={twMerge(itemClasses, isActive && activeItemClasses)}
      key={item.id}
    >
      <div className={twMerge(itemContentClasses)}>
        <p
          className={twMerge(
            "mb-2 text-base font-light md:text-lg",
            isActive && "font-semibold",
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
              isPaused && style.paused,
              `bg-light h-full`,
            )}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
