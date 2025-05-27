import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Card } from "@/components/InfoCards/types";
import { format } from "date-fns";
import Button from "@/components/ui/Button";

interface Props {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  disabled?: boolean;
}

const InfoCard = ({ card, onEdit, onDelete, disabled }: Props) => {
  const dateFrom = format(card.dateFrom, "yyyy-MM");
  const dateTo = card.dateTo ? format(card.dateTo, "yyyy-MM") : "dabar";

  return (
    <div className="card">
      <div className="flex flex-row justify-between">
        <h2 className="text-dark text-lg font-semibold">{card.title}</h2>
        {!disabled && (
          <div className="flex flex-row gap-2">
            <Button
              disabled={disabled}
              variant="link"
              onClick={() => onEdit(card)}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="lg" />
            </Button>
            <Button
              variant="link"
              color="danger"
              disabled={disabled}
              onClick={() => onDelete(card)}
            >
              <FontAwesomeIcon icon={faTrashCan} size="lg" />
            </Button>
          </div>
        )}
      </div>
      <p className="text-[14px] text-gray-500">
        {card.subtitle}{" "}
        <span className="font-semibold text-nowrap text-gray-600">
          ({dateFrom} - {dateTo})
        </span>
      </p>
      {card.description && (
        <p className="mt-[5px] text-[15px] whitespace-pre-line text-gray-500">
          {card.description}
        </p>
      )}
    </div>
  );
};

export default InfoCard;
