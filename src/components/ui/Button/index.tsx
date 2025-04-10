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
  children,
}: Props) => {
  const defaultClasses =
    "cursor-pointer px-3 h-[35px] rounded-xs transition-colors shadow-sm font-semibold disabled:cursor-not-allowed flex gap-2 items-center";
  const primaryDefaultClasses =
    "bg-primary text-light hover:bg-primary/90 disabled:bg-primary/50";
  const primaryOutlineClasses =
    "bg-transparent text-violet-500 border-3 border-primary hover:bg-primary hover:text-light hover:border-primary/90";
  const lgClasses = "h-[45px] px-5 text-lg";

  const buttonClass = twMerge(
    defaultClasses,
    color === "primary" && variant === "default" && primaryDefaultClasses,
    variant === "outline" && primaryOutlineClasses,
    size === "lg" && lgClasses,
  );

  if (variant === "link" && href) {
    return (
      <Link
        className="text-primary hover:text-primary/80 cursor-pointer font-bold transition-colors"
        href={href}
      >
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
