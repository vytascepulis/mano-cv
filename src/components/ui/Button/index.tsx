import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Loader from "@/components/ui/Loader";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "danger";
  variant?: "default" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  target?: string;
  className?: string;
  type?: "button" | "submit";
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
  type = "button",
  children,
}: Props) => {
  const defaultClasses =
    "cursor-pointer justify-center px-3 h-[35px] rounded-xs transition-colors shadow-sm font-semibold disabled:cursor-not-allowed flex gap-2 items-center";
  const linkClasses = "font-bold shadow-none px-0 h-auto";

  const primaryDefaultClasses =
    "bg-violet-600 text-gray-50 hover:bg-violet-700 disabled:bg-violet-600/50";
  const primaryOutlineClasses =
    "bg-transparent text-violet-500 border-3 border-violet-600 hover:bg-violet-600 hover:text-gray-50 disabled:bg-violet-600/50 disabled:border-none disabled:text-gray-50";
  const primaryLinkClasses = "text-violet-600 hover:text-violet-800";

  const secondaryDefaultClasses =
    "bg-gray-900 text-gray-50 hover:bg-gray-800 disabled:bg-gray-900/50";
  const secondaryOutlineClasses =
    "bg-transparent text-gray-900 border-3 border-gray-900 hover:bg-gray-900 hover:text-gray-50 disabled:bg-gray-900/50 disabled:border-none disabled:text-gray-50";
  const secondaryLinkClasses = "text-gray-900 hover:text-gray-700";

  const dangerDefaultClasses =
    "bg-red-500 text-gray-50 hover:bg-red-600 disabled:bg-red-500/50";
  const dangerOutlineClasses =
    "bg-transparent text-red-500 border-3 border-red-500 hover:bg-red-500 hover:text-gray-50 disabled:bg-red-500/50 disabled:border-none disabled:text-gray-50";
  const dangerLinkClasses = "text-red-500 hover:text-red-700";

  const buttonClass = twMerge(
    defaultClasses,
    className,
    variant === "link" && linkClasses,
    variant === "default" && color === "primary" && primaryDefaultClasses,
    variant === "outline" && color === "primary" && primaryOutlineClasses,
    variant === "link" && color === "primary" && primaryLinkClasses,
    variant === "default" && color === "secondary" && secondaryDefaultClasses,
    variant === "outline" && color === "secondary" && secondaryOutlineClasses,
    variant === "link" && color === "secondary" && secondaryLinkClasses,
    variant === "default" && color === "danger" && dangerDefaultClasses,
    variant === "outline" && color === "danger" && dangerOutlineClasses,
    variant === "link" && color === "danger" && dangerLinkClasses,
    size === "lg" && "text-lg",
    size === "sm" && "text-sm",
    (variant === "default" || variant === "outline") &&
      size === "lg" &&
      "h-[45px] px-5",
    (variant === "default" || variant === "outline") &&
      size === "sm" &&
      "h-[25px] px-2",
  );

  if (href) {
    return (
      <Link
        className={buttonClass}
        href={href}
        target={target}
        onClick={onClick}
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
      type={type}
    >
      {children}
      {loading && <Loader size="sm" />}
    </button>
  );
};

export default Button;
