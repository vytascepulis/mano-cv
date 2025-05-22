import Loader from "@/components/ui/Loader";

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Toggle = ({ checked, onChange, label, disabled, loading }: Props) => {
  return (
    <label className="inline-flex cursor-pointer items-center has-disabled:cursor-not-allowed">
      <input
        type="checkbox"
        checked={checked}
        className="peer sr-only"
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled || loading}
      />
      <div className="peer peer-checked:bg-primary relative h-6 w-11 rounded-full bg-gray-400 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
      {label && <span className="ms-3">{label}</span>}
      {loading && (
        <span className="ml-2">
          <Loader size="sm" />
        </span>
      )}
    </label>
  );
};

export default Toggle;
