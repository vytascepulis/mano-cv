import { twMerge } from "tailwind-merge";
import style from "./style.module.css";
import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo-dark.png";
import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

const Footer = () => {
  return (
    <div
      className={twMerge(
        poppins.className,
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
  );
};

export default Footer;
