import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onDeleteClick?: () => void;
}

const Pill = ({ children, disabled, onDeleteClick }: Props) => {
  return (
    <div className="bg-primary relative max-w-[230px] cursor-default rounded-full px-[10px] py-[5px] text-center font-bold text-wrap wrap-break-word text-white">
      {children}
      {!disabled && onDeleteClick && (
        <button
          className="absolute top-[-10px] right-[-10px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-violet-900"
          onClick={onDeleteClick}
        >
          <FontAwesomeIcon className="text-light" icon={faXmark} />
        </button>
      )}
    </div>
  );
};

export default Pill;
