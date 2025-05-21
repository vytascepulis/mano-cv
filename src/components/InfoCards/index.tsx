import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardOptions, ModalState } from "@/components/InfoCards/types";
import InfoCard from "@/components/InfoCards/InfoCard";
import EditCardModal from "@/components/InfoCards/EditCardModal";
import { v4 as uuidv4 } from "uuid";

interface Props {
  cards: Card[];
  options: CardOptions;
  onAdd: (cards: Card[]) => void;
  disabled?: boolean;
  name: string;
}

const sortCards = (cards: Card[]) => {
  // @ts-expect-error ignore
  return cards.sort((a, b) => b.dateFrom - a.dateFrom);
};

const InfoCards = ({ cards, options, onAdd, disabled, name }: Props) => {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const onEdit = (card: Card) => {
    setModalState({ mode: "edit", selectedCard: card });
  };

  const onNew = () => {
    setModalState({ mode: "new", selectedCard: null });
  };

  const onDelete = (card: Card) => {
    setModalState({ mode: "delete", selectedCard: card });
  };

  const handleCloseModals = () => {
    setModalState(null);
  };

  const handleEdit = (card: Card) => {
    const updated = cards.map((item) => {
      if (item.id === card?.id) {
        return card;
      }

      return item;
    });

    onAdd(sortCards(updated));
  };

  const handleAddNew = (card: Card) => {
    onAdd(sortCards([...cards, { ...card, id: uuidv4() }]));
  };

  const handleDelete = (card: Card) => {
    const updated = cards.filter((item) => item.id !== card.id);
    onAdd(sortCards(updated));
  };

  const onEditSubmit = (card: Card) => {
    const mode = modalState?.mode;

    if (mode === "edit") {
      handleEdit(card);
    }

    if (mode === "new") {
      handleAddNew(card);
    }

    if (mode === "delete") {
      handleDelete(card);
    }

    handleCloseModals();
  };

  return (
    <div className="flex w-full flex-col gap-[10px]">
      {!disabled && (
        <Button variant="outline" onClick={onNew}>
          {options.addNewBtnChildren}
        </Button>
      )}
      {Boolean(cards.length) && (
        <div className="flex flex-col gap-[10px]">
          {cards.map((card) => (
            <InfoCard
              key={card.id}
              card={card}
              onEdit={onEdit}
              onDelete={onDelete}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      <EditCardModal
        isOpen={Boolean(modalState)}
        handleClose={handleCloseModals}
        onSubmit={onEditSubmit}
        state={modalState}
        options={options}
        name={name}
      />
    </div>
  );
};

export default InfoCards;
