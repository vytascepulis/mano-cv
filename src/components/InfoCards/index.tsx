import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardOptions, ModalState } from "@/components/InfoCards/types";
import InfoCard from "@/components/InfoCards/InfoCard";
import EditCardModal from "@/components/InfoCards/EditCardModal";
import { v4 as uuidv4 } from "uuid";

interface Props {
  initialCards?: Card[];
  options: CardOptions;
  onAdd: (cards: Card[]) => void;
}

const sortCards = (cards: Card[]) => {
  // @ts-expect-error ignore
  return cards.sort((a, b) => b.dateFrom - a.dateFrom);
};

const InfoCards = ({ initialCards, options, onAdd }: Props) => {
  const [cards, setCards] = useState<Card[]>(sortCards(initialCards || []));
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
    setCards((prevState) => {
      const updated = prevState.map((item) => {
        if (item.id === card?.id) {
          return card;
        }

        return item;
      });
      onAdd(updated);
      return sortCards(updated);
    });
  };

  const handleAddNew = (card: Card) => {
    setCards((prevState) => {
      const updated = [...prevState, { ...card, id: uuidv4() }];
      onAdd(updated);
      return sortCards(updated);
    });
  };

  const handleDelete = (card: Card) => {
    setCards((prevState) => {
      const updated = prevState.filter((item) => item.id !== card.id);
      onAdd(updated);
      return sortCards(updated);
    });
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
      <Button variant="outline" onClick={onNew}>
        Pridėti naują
      </Button>
      {Boolean(cards.length) && (
        <div className="flex flex-col gap-[10px]">
          {cards.map((card) => (
            <InfoCard
              key={card.id}
              card={card}
              onEdit={onEdit}
              onDelete={onDelete}
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
      />
    </div>
  );
};

export default InfoCards;
