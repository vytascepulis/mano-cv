import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Card } from "@/components/InfoCards/types";
import { format } from "date-fns";

interface Props {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
}

const InfoCard = ({ card, onEdit, onDelete }: Props) => {
  const dateFrom = format(card.dateFrom, "yyyy-MM");
  const dateTo = card.dateTo ? format(card.dateTo, "yyyy-MM") : "dabar";

  return (
    <div className="card">
      <div className="flex flex-row justify-between">
        <h2 className="text-dark text-lg font-semibold">{card.title}</h2>
        <div className="flex flex-row gap-2">
          <button
            className="cursor-pointer text-violet-800 transition-colors hover:text-violet-900"
            onClick={() => onEdit(card)}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          </button>
          <button
            className="cursor-pointer text-red-500 transition-colors hover:text-red-600"
            onClick={() => onDelete(card)}
          >
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </button>
        </div>
      </div>
      <p className="text-[14px] text-gray-500">
        {card.subtitle}{" "}
        <span className="font-semibold text-nowrap text-gray-600">
          ({dateFrom} - {dateTo})
        </span>
      </p>
      <p className="mt-[5px] text-[15px] text-gray-500">{card.description}</p>
    </div>
  );
};

export default InfoCard;
