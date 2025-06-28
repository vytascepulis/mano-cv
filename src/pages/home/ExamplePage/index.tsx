import { SubdomainData } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { getGenericUserPhoto } from "@/utils/user";
import style from "./style.module.css";
import { UserStatus } from "@/types/enums";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { formatSubdomainUrl } from "@/utils/subdomain";
import Button from "@/components/ui/Button";
import CropModal from "@/components/PhotoUpload/CropModal";
import { fileToUrl } from "@/components/PhotoUpload/utils";

interface Props {
  subdomainData: SubdomainData;
  handleDownload: () => void;
  mock?: boolean;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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

const subdomainData = {
  intro:
    "Esu atsakingas, nuoširdus ir komunikabilus, vertinantis tvarką ir aiškumą. Greitai mokausi, lengvai prisitaikau prie naujų situacijų ir mėgstu dirbti tiek savarankiškai, tiek komandoje.",
  image: getGenericUserPhoto(),
  fullName: "Vardis Pavardis",
};

const ExamplePage = () => {
  const { data } = useSession();
  const { toggleLoginModal } = useGlobalContext();

  const [name, setName] = useState(subdomainData.fullName);

  const handleCtaOnClick = () => {
    if (!data || data.user.userStatus === UserStatus.INITIALIZED) {
      return toggleLoginModal();
    }

    const url = data?.user.subdomainSlug
      ? `${formatSubdomainUrl(data.user.subdomainSlug)}/nustatymai`
      : undefined;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const [cropModal, setCropModal] = useState(false);
  const [croppedSrc, setCroppedSrc] = useState<string | null>(null);

  const refFileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    refFileInput.current?.click();
  };

  const handleOnUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedSrc(fileToUrl(file));
      setCropModal(true);

      if (refFileInput.current) {
        refFileInput.current.value = "";
      }
    }
  };

  const handleOnCropSubmit = (file: Blob) => {
    setCropModal(false);
    setCroppedSrc(fileToUrl(file));
  };

  return (
    <div className="mx-auto max-w-[1100px] overflow-hidden rounded-xl border border-gray-300">
      <div className="flex h-[60px] flex-row items-center gap-4 border-b border-slate-300 bg-gray-300 px-4">
        <div className="flex flex-row gap-2">
          <span className="block h-[16px] w-[16px] rounded-full bg-[#FF5F57] shadow-md" />
          <span className="block h-[16px] w-[16px] rounded-full bg-[#FFBD2E] shadow-md" />
          <span className="block h-[16px] w-[16px] rounded-full bg-[#28C840] shadow-md" />
        </div>
        <div className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-[1px] text-lg text-slate-800 shadow-sm md:min-w-[250px]">
          <span className="font-bold text-violet-500">
            {name.split(" ")[0].toLowerCase()}
          </span>
          .mano-cv.lt
        </div>
      </div>
      <div
        className={twMerge(
          poppins.className,
          "bg-linear-65 from-gray-50 to-violet-100 px-[0px] pt-[30px] md:pt-[50px]",
        )}
      >
        <div className="mx-auto box-content max-w-[1000px] px-4 md:px-10">
          <div className="flex flex-col items-center gap-[40px] md:flex-row md:items-start md:gap-[70px]">
            <div className="order-2 w-full md:order-1">
              <p className="relative text-lg md:mb-2 md:text-3xl">
                👋 Labas! <span className="text-primary">—</span>{" "}
              </p>
              <p className="relative mb-3 max-w-[700px] text-3xl leading-tight md:mb-10 md:text-5xl">
                Aš{" "}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  // @ts-expect-error nothing to see here
                  onInput={(e) => setName(e.target.innerText)}
                  className="bg-linear-65 from-violet-800 to-violet-600 bg-clip-text font-semibold tracking-wide text-transparent caret-violet-700 outline-offset-4 focus:rounded-lg focus:outline focus:outline-violet-600"
                >
                  {subdomainData.fullName}
                </span>
              </p>
              <div>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  className="mb-5 text-sm leading-relaxed font-light text-gray-500 caret-violet-600 outline-offset-4 focus:rounded-lg focus:outline focus:outline-violet-600 md:mb-7 md:text-lg"
                >
                  {subdomainData.intro}
                </p>
                <DownloadBtn handleDownload={handleCtaOnClick} />
              </div>
            </div>
            <div
              className={twMerge(
                style.photoContainer,
                "order-1 flex shrink-0 basis-[200px] items-center justify-center md:order-2 md:h-[300px] md:basis-[200px]",
              )}
            >
              <a
                className={twMerge(
                  style.photo,
                  "group relative h-[150px] w-[150px] cursor-pointer rounded-full border-1 border-gray-200 shadow-md md:h-[200px] md:w-[200px]",
                )}
                onClick={handleUploadClick}
              >
                <img
                  src={croppedSrc || getGenericUserPhoto()}
                  alt={subdomainData.fullName}
                  className={twMerge(
                    !croppedSrc && "blur-[4px]",
                    "rounded-full group-hover:blur-[4px]",
                  )}
                />

                <Button
                  className={twMerge(
                    !croppedSrc && "visible!",
                    "invisible absolute top-[50%] left-[50%] h-auto translate-x-[-50%] translate-y-[-50%] group-hover:visible",
                  )}
                >
                  Pasirinkti
                </Button>
              </a>
              <input
                ref={refFileInput}
                className="hidden"
                type="file"
                onChange={handleOnUpload}
                accept="image/png, image/jpeg, image/jpg"
              />
              {uploadedSrc && (
                <CropModal
                  isOpen={cropModal}
                  handleClose={() => setCropModal(false)}
                  imgSrc={uploadedSrc}
                  onSubmit={handleOnCropSubmit}
                />
              )}
              <div
                className={twMerge(
                  style.shadow,
                  "absolute bottom-[-10px] left-[50%] translate-x-[-50%] justify-center rounded-xl border-1 border-gray-200 bg-gray-50 px-4 py-2 md:px-6",
                  "text-md md:text-lg",
                )}
              >
                {name.split(" ")[0]}
              </div>
            </div>
          </div>
          <div>
            <div
              className={twMerge(
                style.line,
                style.right,
                "mt-[50px] mb-[50px] hidden md:mt-[70px] md:mb-[60px] md:block",
              )}
            />
            <div className="relative mt-[30px] blur-xs select-none md:mt-0">
              <p className="text-dark text-md text-center md:mb-2 md:text-lg">
                <FontAwesomeIcon
                  className="text-primary mr-3"
                  icon={faSquarePollVertical}
                />
                Ekspertizė ir gebėjimai
              </p>
              <p className="text-center text-2xl md:text-4xl">
                <span className="text-dark font-semibold">Mano</span>{" "}
                <span className="text-primary italic">įgūdžiai</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
