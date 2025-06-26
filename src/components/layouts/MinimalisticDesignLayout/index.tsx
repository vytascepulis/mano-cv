import { twMerge } from "tailwind-merge";
import style from "@/components/layouts/ClassicDesignLayout/style.module.css";
import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo.png";
import React from "react";

const MinimalisticDesignLayout = () => {
  return (
    <div className="min-h-screen bg-violet-50">
      <div>asd</div>

      <div
        className={twMerge(
          style.shadow,
          "text-dark mt-[50px] flex flex-row items-center justify-center bg-violet-100 pt-3 pb-4 md:mt-[150px] md:pt-6 md:pb-8",
        )}
      >
        <a
          href={getDomainUrl()}
          target="_blank"
          className="flex items-center gap-2"
        >
          <span className="text-[11px] font-light">sukurta su</span>
          <img
            src={logo.src}
            alt="mano-cv.lt logo"
            className="w-[120px] md:w-[150px]"
          />
        </a>
      </div>
    </div>
  );
};

export default MinimalisticDesignLayout;
