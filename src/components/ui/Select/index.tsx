import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useClickOutside from "@/hooks/useClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  options: Option[];
  initialValue?: Option;
  onChange: (value: Option) => void;
  disabled?: boolean;
  label?: React.ReactNode;
}

interface Option {
  value: string;
  label: string;
}

const Select = ({
  options,
  initialValue,
  onChange,
  disabled,
  label,
}: Props) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue?.label || "");

  const refInput = useRef<HTMLInputElement>(null);
  const refOptionsNode = useRef<HTMLUListElement>(null);

  useClickOutside({
    element: refInput,
    ignores: [refOptionsNode],
    callback: () => {
      if (!optionsVisible) return;

      setOptionsVisible(false);

      if (selectedOption) {
        setInputValue(selectedOption.label);
        setFilteredOptions(options);
      }
    },
  });

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(() =>
      options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleOnOptionSelect = (option: Option) => {
    setOptionsVisible(false);
    setInputValue(option.label);
    setSelectedOption(option);
    onChange(option);
    setFilteredOptions(options);
  };

  return (
    <div className={twMerge("relative w-full")}>
      <label className={twMerge("flex grow flex-col")}>
        {label && (
          <span className="pb-1 font-semibold text-gray-700">{label}</span>
        )}
        <input
          ref={refInput}
          type="text"
          value={inputValue}
          onChange={handleInputOnChange}
          className={twMerge(
            "bg-light rounded-xs shadow-sm",
            "w-full py-[6px] pr-1 pl-3 outline-0 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100",
            optionsVisible && "outline-primary rounded-xs outline-3",
          )}
          onFocus={() => setOptionsVisible(true)}
          disabled={disabled}
        />
        <FontAwesomeIcon
          size="lg"
          className={twMerge(
            "pointer-events-none absolute right-[8px] bottom-[8px] transition-transform duration-300",
            optionsVisible && "text-primary rotate-180",
            !optionsVisible && "text-gray-400",
          )}
          icon={faChevronDown}
        />
      </label>
      <ul
        ref={refOptionsNode}
        className={twMerge(
          optionsVisible ? "visible" : "invisible",
          "absolute top-[calc(100%+3px)] z-10 max-h-[160px] w-full overflow-y-auto rounded-xs bg-violet-100",
        )}
      >
        {filteredOptions.map((option) => (
          <li
            key={option.value}
            className={twMerge(
              "hover:bg-primary hover:text-light text-dark cursor-pointer py-2 pr-1 pl-3 transition-colors",
              selectedOption?.value === option.value && "bg-primary text-light",
            )}
            onClick={() => {
              handleOnOptionSelect(option);
            }}
          >
            {option.label}
          </li>
        ))}
        {filteredOptions.length === 0 && (
          <li className="p-4 text-center">Rezultatų nerasta</li>
        )}
      </ul>
    </div>
  );
};

export default Select;
