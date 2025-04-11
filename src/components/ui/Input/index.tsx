import { twMerge } from "tailwind-merge";

interface GenericProps {
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface TextProps extends GenericProps {
  type: "text";
}

interface SuffixProps extends GenericProps {
  type: "suffix";
  suffix: string;
}

type Props = TextProps | SuffixProps;

const Input = (props: Props) => {
  const { onChange, type, placeholder, disabled, className } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  if (type === "suffix") {
    const { suffix } = props;

    return (
      <span
        className={twMerge(
          className,
          "bg-light has-focus:outline-primary flex h-[35px] items-center rounded-xs shadow-sm has-focus:outline-3 has-disabled:bg-gray-100",
        )}
      >
        <input
          className="h-full w-0 min-w-0 grow pr-1 pl-3 outline-0 placeholder:text-gray-400 disabled:cursor-not-allowed"
          onChange={handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        <span className="shrink-0 pr-3 pl-1">{suffix}</span>
      </span>
    );
  }
  return <input />;
};

export default Input;
