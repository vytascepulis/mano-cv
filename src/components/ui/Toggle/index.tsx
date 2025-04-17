interface Props {
  initialValue: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

const Toggle = ({ initialValue, onChange, label }: Props) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        defaultChecked={initialValue}
        className="peer sr-only"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="peer peer-checked:bg-primary relative h-6 w-11 rounded-full bg-gray-400 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
      {label && <span className="ms-3">{label}</span>}
    </label>
  );
};

export default Toggle;
