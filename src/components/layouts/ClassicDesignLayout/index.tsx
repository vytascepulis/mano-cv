import { SubdomainData } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { getUserPhoto } from "@/utils/user";
import style from "./style.module.css";

interface Props {
  subdomainData: SubdomainData;
  handleDownload: () => void;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Customize weights as needed
  display: "swap",
});

const DownloadBtn = ({
  handleDownload,
}: {
  handleDownload: Props["handleDownload"];
}) => {
  return (
    <button
      className={twMerge(
        style.animatedGradient,
        "w-full cursor-pointer rounded-full bg-gradient-to-br px-5 py-2 text-lg font-semibold text-gray-50 md:w-auto",
      )}
      onClick={handleDownload}
    >
      <FontAwesomeIcon icon={faFilePdf} className="mr-3" />
      Atsisiųsti CV
    </button>
  );
};

const ClassicDesignLayout = ({ subdomainData, handleDownload }: Props) => {
  return (
    <div
      className={twMerge(
        poppins.className,
        "min-h-screen bg-linear-65 from-gray-50 to-violet-100",
      )}
    >
      <div className="mx-auto box-content max-w-[1000px] px-4 pt-[30px] md:px-10 md:pt-[150px]">
        <div className="flex flex-col items-center gap-[40px] md:flex-row md:gap-[70px]">
          <div className="order-2 w-full md:order-1">
            <p className="text-lg md:mb-3 md:text-3xl">
              👋 Labas! <span className="text-primary">—</span>{" "}
            </p>
            <p className="mb-3 text-3xl leading-tight md:mb-10 md:text-5xl">
              Aš{" "}
              <span className="bg-linear-65 from-violet-800 to-violet-600 bg-clip-text font-semibold tracking-wide text-transparent">
                {subdomainData.fullName}
              </span>
            </p>
            <p className="mb-5 text-sm leading-relaxed font-light text-gray-500 md:mb-7 md:text-lg">
              {subdomainData.intro}
            </p>
            <DownloadBtn handleDownload={handleDownload} />
          </div>
          <div
            className={twMerge(
              style.photoContainer,
              "order-1 flex shrink-0 basis-[200px] items-center justify-center md:order-2 md:h-[300px] md:basis-[200px]",
            )}
          >
            <img
              src={getUserPhoto(subdomainData.image!)}
              alt={subdomainData.fullName}
              className={twMerge(
                style.photo,
                "h-[150px] w-[150px] rounded-full border-1 border-gray-200 shadow-md md:h-[200px] md:w-[200px]",
              )}
            />
            <div
              className={twMerge(
                style.shadow,
                "absolute bottom-[-10px] left-[50%] translate-x-[-50%] justify-center rounded-xl border-1 border-gray-200 bg-gray-50 px-4 py-2 md:px-6",
                "text-md md:text-lg",
              )}
            >
              {subdomainData.fullName.split(" ")[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicDesignLayout;
