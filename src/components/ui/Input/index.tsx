import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

interface GenericProps {
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  label?: React.ReactNode;
  defaultValue?: string;
  required?: boolean;
  name?: string;
}

interface TextProps extends GenericProps {
  type: "text";
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
    label,
    defaultValue,
    required,
    name,
  } = props;

  const [value, setValue] = useState(defaultValue || "");

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);

    if (!onEnter) {
      onChange?.(e.target.value);
    }
  };

  const handleOnEnter = (
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
    "bg-light flex h-[35px] items-center rounded-xs shadow-sm 3 has-disabled:bg-gray-100";

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
          onKeyDown={handleOnEnter}
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
            "bg-light rounded-xs shadow-sm outline-0",
            "py-[6px] pr-1 pl-3",
            "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100",
            defaultClasses,

            "h-auto py-1",
          )}
          onChange={handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onKeyDown={handleOnEnter}
          maxLength={maxLength}
          required={required}
          name={name}
        />
      </label>
    );
  }

  return (
    <label className={twMerge(className, "flex grow flex-col")}>
      {label && (
        <span className="pb-1 font-semibold text-gray-700">{label}</span>
      )}
      <input
        className={twMerge(
          "bg-light rounded-xs shadow-sm outline-0",
          "py-[6px] pr-1 pl-3",
          "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100",
          defaultClasses,
        )}
        onChange={handleOnChange}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onKeyDown={handleOnEnter}
        maxLength={maxLength}
        required={required}
        name={name}
      />
    </label>
  );
};

export default Input;
