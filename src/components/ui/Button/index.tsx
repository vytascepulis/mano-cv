import React, { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Loader from "@/components/ui/Loader";

export interface ButtonProps {
  color?: "primary" | "danger" | "light";
  variant?: "default" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  target?: string;
  className?: string;
  type?: "button" | "submit";
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
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
    },
    ref,
  ) => {
    const baseClasses =
      "cursor-pointer rounded-lg font-medium text-base disabled:cursor-not-allowed flex items-center gap-2 justify-center h-full";

    const defaultClasses = "border-1 shadow-sm";
    const outlineClasses = "border-1 bg-transparent";
    const linkClasses = "px-0 font-bold";

    const sizeSmClasses = "text-xs p-[5px]";
    const sizeMdClasses = "text-md px-[10px] py-[4px]";
    const sizeLgClasses = "text-lg px-[20px] py-[8px]";

    const primaryDefaultClasses =
      "bg-violet-600 text-slate-100 border-violet-800 hover:bg-violet-700 disabled:bg-violet-600/50 disabled:hover:pointer-events-none";
    const primaryOutlineClasses =
      "text-violet-500 border-violet-500 hover:bg-violet-700 hover:border-violet-800 hover:text-slate-100 disabled:bg-violet-600/50  disabled:text-slate-100";
    const primaryLinkClasses =
      "text-violet-600 hover:text-violet-800 disabled:text-slate-400";

    const dangerDefaultClasses =
      "bg-red-500 text-slate-100 border-red-700 hover:bg-red-600 disabled:bg-red-500/50";
    const dangerOutlineClasses =
      " text-red-500 border-red-700 hover:bg-red-500 hover:text-slate-100 disabled:bg-red-500/50 disabled:text-gray-50";
    const dangerLinkClasses =
      "text-red-500 hover:text-red-700 disabled:text-red-700";

    const lightDefaultClasses =
      "bg-slate-50 text-slate-900 border-slate-300 hover:bg-slate-200 disabled:bg-slate-200";
    const lightOutlineClasses =
      " text-slate-50 border-slate-300 hover:bg-slate-100 hover:text-slate-900 disabled:bg-slate-100 disabled:text-slate-900";
    const lightLinkClasses =
      "text-slate-50 hover:text-slate-200 disabled:text-slate-200";

    const buttonClass = twMerge(
      baseClasses,
      className,
      variant === "default" && color === "primary" && primaryDefaultClasses,
      variant === "outline" && color === "primary" && primaryOutlineClasses,
      variant === "link" && color === "primary" && primaryLinkClasses,
      variant === "default" && color === "danger" && dangerDefaultClasses,
      variant === "outline" && color === "danger" && dangerOutlineClasses,
      variant === "link" && color === "danger" && dangerLinkClasses,
      variant === "default" && color === "light" && lightDefaultClasses,
      variant === "outline" && color === "light" && lightOutlineClasses,
      variant === "link" && color === "light" && lightLinkClasses,
      size === "sm" && sizeSmClasses,
      size === "md" && sizeMdClasses,
      size === "lg" && sizeLgClasses,
      variant === "default" && defaultClasses,
      variant === "outline" && outlineClasses,
      variant === "link" && linkClasses,
    );

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          className={buttonClass}
          onClick={onClick}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClass}
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
      >
        {children}
        {loading && <Loader size="sm" />}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
