import Input from "@/components/ui/Input";
import { twMerge } from "tailwind-merge";
import { useState, ReactNode, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

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
      <div className="flex min-h-[34px] flex-row flex-wrap items-start gap-2 lg:justify-end">
        {pills.map((pill, idx) => (
          <Pill
            key={idx}
            disabled={disabled}
            onDeleteClick={() => handleDeletePill(pill)}
          >
            {pill}
          </Pill>
        ))}
      </div>
    </form>
  );
};

export default InputPills;
