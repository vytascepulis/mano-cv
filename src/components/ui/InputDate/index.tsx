import DatePicker from "react-datepicker";
import { twMerge } from "tailwind-merge";
import "react-datepicker/dist/react-datepicker.css";
import { lt } from "date-fns/locale/lt";
import { forwardRef } from "react";
import Button, { ButtonProps } from "@/components/ui/Button";

interface Props {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  variant?: ButtonProps["variant"];
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  required?: boolean;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholder, variant, disabled, required }, ref) => {
    return (
      <div className="relative">
        {required && (
          <input
            className="pointer-events-none absolute bottom-0 left-[50%] h-px w-px opacity-0"
            type="text"
            value={value || ""}
            required
            disabled={disabled}
          />
        )}
        <Button
          variant={variant}
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className="w-full"
        >
          {value || placeholder || "Pasirinkti"}
        </Button>
      </div>
    );
  },
);

CustomInput.displayName = "ExampleCustomInput";

const InputDate = ({
  selectedDate,
  onChange,
  placeholder,
  label,
  required,
  disabled,
  variant,
}: Props) => {
  return (
    <div
      className={twMerge(
        "max-w-auto flex w-full flex-1 grow flex-col sm:max-w-[200px]",
      )}
    >
      {label && (
        <span className="pb-1 font-semibold text-gray-700">{label}</span>
      )}
      <DatePicker
        className={twMerge(
          "bg-light rounded-xs shadow-sm outline-0",
          "py-[6px] pr-1 pl-3",
          "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100",
          "focus:outline-primary focus:outline-3",
          "w-full",
        )}
        selected={selectedDate}
        onChange={(date) => {
          if (date) {
            onChange(date);
          }
        }}
        dateFormat="yyyy-MM"
        showMonthYearPicker
        placeholderText={placeholder}
        locale={lt}
        showFullMonthYearPicker
        required={required}
        disabled={disabled}
        showPopperArrow={false}
        customInput={
          <CustomInput
            placeholder={placeholder}
            variant={variant}
            disabled={disabled}
            required={required}
          />
        }
      />
    </div>
  );
};

export default InputDate;
