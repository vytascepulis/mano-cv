import { IToggleCard, ToggleOptions } from "@/components/ToggleCards/types";
import ToggleCard from "@/components/ToggleCards/ToggleCard";

interface Props {
  cards: IToggleCard[];
  selectedSlug: string;
  options?: ToggleOptions;
}

const ToggleCards = ({ cards, options, selectedSlug }: Props) => {
  const handleCardSelect = (card: IToggleCard) => {
    options?.onSelect?.(card);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {cards.map((card) => (
        <ToggleCard
          key={card.slug}
          card={card}
          handleSelect={handleCardSelect}
          options={options}
          isSelected={selectedSlug === card.slug}
        />
      ))}
    </div>
  );
};

export default ToggleCards;
