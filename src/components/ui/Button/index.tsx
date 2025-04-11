import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Loader from "@/components/ui/Loader";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  variant?: "default" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  target?: string;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  color = "primary",
  variant = "default",
  size = "md",
  onClick,
  disabled,
  href,
  loading,
  target,
  className,
  children,
}: Props) => {
  const defaultClasses =
    "cursor-pointer justify-center px-3 h-[35px] rounded-xs transition-colors shadow-sm font-semibold disabled:cursor-not-allowed flex gap-2 items-center";
  const primaryDefaultClasses =
    "bg-primary text-light hover:bg-violet-700 disabled:bg-primary/50";
  const primaryOutlineClasses =
    "bg-transparent text-violet-500 border-3 border-primary hover:bg-primary hover:text-light hover:border-primary/90";
  const lgClasses = "h-[45px] px-5 text-lg";

  const defaultLinkClasses =
    "text-primary hover:text-primary/80 cursor-pointer font-bold transition-colors shadow-none px-0 h-auto";

  const linkClass = twMerge(className, defaultLinkClasses);

  const buttonClass = twMerge(
    className,
    defaultClasses,
    color === "primary" && variant === "default" && primaryDefaultClasses,
    variant === "outline" && primaryOutlineClasses,
    size === "lg" && lgClasses,
    variant === "link" && linkClass,
  );

  if (href) {
    return (
      <Link className={linkClass} href={href} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
      {loading && <Loader size="sm" />}
    </button>
  );
};

export default Button;
