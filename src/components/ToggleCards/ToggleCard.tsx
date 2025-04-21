import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { IToggleCard, ToggleOptions } from "@/components/ToggleCards/types";
import { twMerge } from "tailwind-merge";

interface Props {
  card: IToggleCard;
  handleSelect?: (card: IToggleCard) => void;
  options?: ToggleOptions;
  isSelected: boolean;
  disabled?: boolean;
}

const ToggleCard = ({
  card,
  handleSelect,
  options,
  isSelected,
  disabled,
}: Props) => {
  const handleOnViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    options?.onView?.(card);
  };

  if (!card) return null;

  return (
    <div
      onClick={() => (disabled ? null : handleSelect?.(card))}
      className={twMerge("card", isSelected && "outline-primary outline-4")}
    >
      <div className="flex flex-row items-start justify-between">
        <h2 className="text-dark text-lg font-semibold">{card.title}</h2>
        {options?.onView && (
          <div className="flex flex-row gap-2">
            <button
              className="cursor-pointer text-violet-800 transition-colors hover:text-violet-900"
              onClick={handleOnViewClick}
            >
              <FontAwesomeIcon icon={faEye} size="lg" />
            </button>
          </div>
        )}
      </div>
      <p className="mt-[5px] text-[15px] text-gray-500">{card.description}</p>
    </div>
  );
};

export default ToggleCard;
