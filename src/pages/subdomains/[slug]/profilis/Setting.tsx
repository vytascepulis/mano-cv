import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  subtitle: string;
  optional?: boolean;
  separated?: boolean;
  children: React.ReactNode;
}

const Setting = ({ title, subtitle, optional, separated, children }: Props) => {
  return (
    <div className={twMerge(separated && "border-t-1 border-t-gray-400 pt-6")}>
      <h2 className="text-dark mb-3 text-[32px] leading-[36px] font-semibold">
        {title}
        {optional && (
          <span className="ml-2 text-[20px] text-gray-600">(nebūtina)</span>
        )}
      </h2>
      <div className="flex flex-col items-start justify-between lg:flex-row">
        <p className="mb-3 shrink-0 text-[17px] font-light lg:max-w-[300px]">
          {subtitle}
        </p>
        <div className="flex w-full max-w-[400px] grow lg:justify-end">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Setting;
