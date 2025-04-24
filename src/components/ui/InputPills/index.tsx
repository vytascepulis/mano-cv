import Input from "@/components/ui/Input";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, ReactNode, FormEvent } from "react";
import Button from "@/components/ui/Button";

interface Props {
  onChange: (pills: string[]) => void;
  className?: string;
  placeholder?: string;
  label?: ReactNode;
  pills: string[];
  addBtnChildren: ReactNode;
  disabled?: boolean;
}

const InputPills = ({
  onChange,
  className,
  placeholder,
  label,
  pills,
  addBtnChildren,
  disabled,
}: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddPills = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputValue.trim();

    if (!value.length) return;

    onChange([...pills, value]);
    setInputValue("");
  };

  const handleDeletePill = (pill: string) => {
    const filtered = pills.filter((item) => item !== pill);
    onChange(filtered);
  };

  return (
    <form
      onSubmit={handleAddPills}
      className={twMerge(className, "flex w-full flex-col")}
    >
      {!disabled && (
        <div className="mb-5 flex flex-row items-center gap-2">
          <Input
            placeholder={placeholder}
            type="text"
            maxLength={40}
            label={label}
            defaultValue={inputValue}
            onChange={setInputValue}
            disabled={disabled}
          />
          <Button type="submit" disabled={disabled}>
            {addBtnChildren}
          </Button>
        </div>
      )}
      <div className="flex min-h-[34px] flex-row flex-wrap items-start justify-end gap-2">
        {pills.map((pill, idx) => (
          <div
            key={idx}
            className="group bg-primary relative max-w-[230px] cursor-default rounded-full px-[10px] py-[5px] text-center font-bold text-wrap wrap-break-word text-white"
          >
            {pill}
            {!disabled && (
              <button
                className="invisible absolute top-[-7px] right-[-7px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-violet-900 group-hover:visible"
                onClick={() => handleDeletePill(pill)}
              >
                <FontAwesomeIcon className="text-light" icon={faXmark} />
              </button>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default InputPills;
