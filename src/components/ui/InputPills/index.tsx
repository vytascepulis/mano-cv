import { useState } from "react";
import Input from "@/components/ui/Input";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onChange: (pills: string[]) => void;
  className?: string;
  placeholder?: string;
  label?: React.ReactNode;
}

const InputPills = ({ onChange, className, placeholder, label }: Props) => {
  const [pills, setPills] = useState<string[]>([]);

  const handleAddPills = (value: string) => {
    setPills((prevState) => {
      const newState = [...prevState, value];
      onChange(newState);
      return newState;
    });
  };

  const handleDeletePill = (pill: string) => {
    setPills((prevState) => {
      const newState = [...prevState].filter((item) => item !== pill);
      onChange(newState);
      return newState;
    });
  };

  return (
    <div className={twMerge(className, "flex flex-col")}>
      <Input
        placeholder={placeholder}
        type="text"
        onEnter={handleAddPills}
        maxLength={40}
        label={label}
      />
      <div className="mt-5 flex min-h-[34px] flex-row flex-wrap items-start justify-end gap-2">
        {pills.map((pill, idx) => (
          <div
            key={idx}
            className="group bg-primary relative max-w-[230px] cursor-default rounded-full px-[10px] py-[5px] text-center font-bold text-wrap wrap-break-word text-white"
          >
            {pill}
            <button
              className="invisible absolute top-[-7px] right-[-7px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-violet-900 group-hover:visible"
              onClick={() => handleDeletePill(pill)}
            >
              <FontAwesomeIcon className="text-light" icon={faXmark} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPills;
