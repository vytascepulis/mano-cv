import { useState } from "react";
import { IToggleCard, ToggleOptions } from "@/components/ToggleCards/types";
import ToggleCard from "@/components/ToggleCards/ToggleCard";

interface Props {
  cards: IToggleCard[];
  options?: ToggleOptions;
  selected?: IToggleCard;
}

const ToggleCards = ({ cards, options, selected }: Props) => {
  const [selectedCard, setSelectedCard] = useState<IToggleCard>(
    selected || cards[0],
  );

  const handleCardSelect = (card: IToggleCard) => {
    setSelectedCard(card);
    options?.onSelect?.(card);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {cards.map((card) => (
        <ToggleCard
          key={card.id}
          card={card}
          handleSelect={handleCardSelect}
          options={options}
          isSelected={selectedCard.id === card.id}
        />
      ))}
    </div>
  );
};

export default ToggleCards;
