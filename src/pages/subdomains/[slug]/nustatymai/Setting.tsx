interface Props {
  title: string;
  subtitle: string;
  optional?: boolean;
  children: React.ReactNode;
}

const Setting = ({ title, subtitle, optional, children }: Props) => {
  return (
    <div>
      <h2 className="text-dark mb-3 text-[32px] font-semibold">
        {title}
        {!optional && <span className="text-red-500">*</span>}
      </h2>
      <div className="flex flex-col items-start justify-between lg:flex-row">
        <p className="mb-3 shrink-0 text-[15px] font-light lg:max-w-[250px]">
          {subtitle}
        </p>
        <div className="flex w-full max-w-[400px] grow justify-end">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Setting;
