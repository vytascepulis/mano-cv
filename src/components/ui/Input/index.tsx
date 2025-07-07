import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

interface GenericProps {
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  minLength?: number;
  label?: React.ReactNode;
  defaultValue?: string | null;
  required?: boolean;
  name?: string;
  inputMode?: "numeric" | "text" | "none" | "tel" | "search" | "email" | "url";
}

interface TextProps extends GenericProps {
  type: "text" | "number" | "email";
}

interface SuffixProps extends GenericProps {
  type: "suffix";
  suffix: string;
}

interface TextareaProps extends GenericProps {
  type: "textarea";
  rows?: number;
}

export type Props = TextProps | SuffixProps | TextareaProps;

const Input = (props: Props) => {
  const {
    onChange,
    onEnter,
    type,
    placeholder,
    disabled,
    className,
    maxLength,
    minLength,
    label,
    defaultValue,
    required,
    name,
    inputMode,
  } = props;

  const [value, setValue] = useState(defaultValue || "");

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newVal = e.target.value.replace(/\r\n|\r/g, "\n");

    if (maxLength && value.length >= maxLength) {
      setValue((prevState) => {
        return prevState.slice(0, maxLength);
      });
    } else {
      setValue(newVal);
    }

    if (!onEnter) {
      onChange?.(newVal);
    }
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (onEnter && e.key === "Enter") {
      onEnter(value);
      setValue("");
    }
  };

  const suffixClasses = "has-focus:outline-primary has-focus:outline-3";
  const defaultClasses = "focus:outline-primary focus:outline-3";

  const outsideClasses =
    "bg-light flex h-[35px] items-center rounded-md shadow-sm 3 has-disabled:bg-gray-100";

  const insideClasses =
    "h-full grow pr-1 pl-3 outline-0 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100";

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  if (type === "suffix") {
    const { suffix } = props;

    return (
      <span
        className={twMerge(className, outsideClasses, suffixClasses, "w-full")}
      >
        <input
          className={twMerge(className, insideClasses, "w-0", "min-w-0")}
          onChange={handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onKeyDown={handleOnKeyDown}
        />
        <span className="shrink-0 pr-3 pl-1">{suffix}</span>
      </span>
    );
  }

  if (type === "textarea") {
    const { rows } = props;

    return (
      <label className={twMerge(className, "flex grow flex-col")}>
        {label && (
          <span className="pb-1 font-semibold text-gray-700">{label}</span>
        )}
        <textarea
          rows={rows || 4}
          className={twMerge(
            "bg-light rounded-md shadow-sm outline-0",
            "py-[6px] pr-1 pl-3",
            "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100",
            defaultClasses,

            "h-auto py-1",
          )}
          onChange={handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onKeyDown={handleOnKeyDown}
          maxLength={maxLength}
          required={required}
          name={name}
        />
      </label>
    );
  }

  return (
    <label className={twMerge(className, "flex min-w-0 grow flex-col")}>
      {label && (
        <span className="pb-1 font-semibold text-gray-700">{label}</span>
      )}
      <input
        type={type}
        className={twMerge(
          "bg-light rounded-md shadow-sm outline-0",
          "py-[6px] pr-1 pl-3",
          "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100",
          defaultClasses,
        )}
        onChange={handleOnChange}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onKeyDown={handleOnKeyDown}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        name={name}
        inputMode={inputMode}
      />
    </label>
  );
};

export default Input;
