import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  label?: string;
  checked: boolean;
  name?: string;
  onChange: (val: boolean) => void;
}

const Checkbox = ({ className, label, checked, name, onChange }: Props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={twMerge(className, "flex items-center gap-2")}>
      <input
        checked={checked}
        id={name}
        type="checkbox"
        className="accent-primary h-4 w-4"
        onChange={handleOnChange}
      />
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
