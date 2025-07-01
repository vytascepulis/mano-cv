import { twMerge } from "tailwind-merge";
import React, { useState } from "react";
import { getUserPhoto } from "@/utils/user";
import { LanguageLevel, SubdomainData } from "@/types/types";
import { Poppins, Roboto_Slab } from "next/font/google";
import { Card } from "@/components/InfoCards/types";
import Footer from "@/components/layouts/Footer";
import { getDateDiffString } from "@/utils/date";
import Loader from "@/components/ui/Loader";

interface Props {
  subdomainData: SubdomainData;
  handleDownload: () => void;
  downloadLoading?: boolean;
  mock?: boolean;
}

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const DownloadBtn = ({
  handleDownload,
  downloadLoading,
}: {
  handleDownload: Props["handleDownload"];
  downloadLoading?: boolean;
}) => {
  return (
    <button
      disabled={downloadLoading}
      onClick={handleDownload}
      className={twMerge(
        "flex cursor-pointer items-center justify-center gap-2 rounded-full border-3 border-violet-600 px-3 py-1 text-sm font-semibold text-violet-600 transition-colors hover:bg-violet-100 sm:w-max",
        downloadLoading && "cursor-not-allowed bg-violet-100",
      )}
    >
      Atsisiųsti CV
      {downloadLoading && <Loader size="sm" variant="dark" />}
    </button>
  );
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={twMerge(
        poppins.className,
        "text-light mb-4 rounded-md bg-gray-800 px-4 py-2 text-xl font-semibold tracking-wider uppercase md:mb-8 md:px-5",
      )}
    >
      {title}
    </div>
  );
};

const GeneralInfoCard = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => {
  return (
    <div className="flex gap-3">
      <span className="mt-[11px] block h-2 w-2 shrink-0 rounded-full bg-violet-600" />
      <div className="text-lg">
        <p className={twMerge(poppins.className, "mb-1 text-xl font-semibold")}>
          {title}
        </p>
        {content}
      </div>
    </div>
  );
};

const MinimalisticDesignLayout = ({
  subdomainData,
  handleDownload,
  downloadLoading,
  mock,
}: Props) => {
  const [expandedExperience, setExpandedExperience] = useState<string[]>([]);

  const formatExperienceDescription = (experience: Card) => {
    if (
      expandedExperience.includes(experience.id) ||
      (experience.description || "").length < 150
    ) {
      return experience.description;
    }

    return `${(experience.description || "").slice(0, 150)}...`;
  };

  const CardItem = ({
    item,
    withDivide,
  }: {
    item: Card;
    withDivide?: boolean;
  }) => {
    return (
      <div className={twMerge(withDivide && "pb-4 md:pb-7", "flex flex-col")}>
        <p
          className={twMerge(
            poppins.className,
            "flex flex-row text-xl leading-tight font-semibold",
          )}
        >
          <span className="block shrink-1">{item.title}</span>
          <span className="mx-3 mt-[11px] block h-1 w-1 shrink-0 rounded-full bg-violet-600" />
          <span className="mt-[6px] shrink-0 text-xs font-normal">
            {item.dateFrom} - {item.dateTo ? item.dateTo : "dabar"}
          </span>
        </p>
        <p className={twMerge(poppins.className, "mt-1 text-sm font-light")}>
          {item.subtitle}
        </p>
        {item.description && (
          <p
            className={twMerge(
              robotoSlab.className,
              "mt-3 text-sm font-light md:text-base",
            )}
          >
            {formatExperienceDescription(item)}
            {(item.description || "").length > 50 &&
              !expandedExperience.includes(item.id) && (
                <a
                  onClick={() =>
                    setExpandedExperience((prevState) => [
                      ...prevState,
                      item.id,
                    ])
                  }
                  className="mt-1 block w-max cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
                >
                  Rodyti daugiau
                </a>
              )}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={twMerge(robotoSlab.className, "min-h-screen bg-violet-50")}>
      <div className="mx-auto box-content max-w-[900px] px-4 pt-[30px] text-gray-800 md:pt-[100px]">
        <div className="mb-[30px] grid grid-flow-row auto-rows-max grid-cols-1 gap-x-[50px] gap-y-[20px] md:mb-[100px] md:grid-cols-[200px_1fr]">
          <div className="row-span-3 max-w-[150px] place-self-center md:max-w-[200px] md:place-self-auto">
            <img
              className="rounded-md"
              src={getUserPhoto(subdomainData.image!, mock)}
              alt={subdomainData.fullName}
            />
          </div>
          <p className="text-center text-3xl font-bold uppercase md:text-start md:text-6xl">
            {subdomainData.fullName}
          </p>
          <p className="text-sm font-light md:text-lg">{subdomainData.intro}</p>
          <DownloadBtn
            handleDownload={handleDownload}
            downloadLoading={downloadLoading}
          />
        </div>
        {subdomainData.experience.length > 0 && (
          <>
            <SectionTitle title="Mano patirtis" />
            <div className="mb-[30px] flex flex-col gap-4 divide-y divide-gray-300 md:mb-[70px] md:gap-7">
              {subdomainData.experience.map((item) => (
                <CardItem item={item} key={item.id} withDivide />
              ))}
            </div>
          </>
        )}
        <SectionTitle title="Išsilavinimas" />
        <div className="mb-[30px] flex flex-col gap-4 divide-y divide-gray-300 md:mb-[70px] md:gap-7">
          {subdomainData.education.map((item) => (
            <CardItem item={item} key={item.id} withDivide />
          ))}
        </div>
        <SectionTitle title="Mano įgūdžiai" />
        <div className="mb-[30px] grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3 sm:gap-y-4 md:mb-[70px]">
          {subdomainData.skills.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-start gap-4 md:text-lg"
            >
              <span className="mt-[8px] block h-2 w-2 shrink-0 rounded-full bg-violet-600 md:mt-[11px]" />
              {item}
            </div>
          ))}
        </div>
        <SectionTitle title="Bendra informacija" />
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 md:gap-y-8">
          <GeneralInfoCard
            title="Kontaktai"
            content={
              <>
                <p>{subdomainData.phoneNumber}</p>
                {subdomainData.email && <p>{subdomainData.email}</p>}
                <p className="mb-2">{subdomainData.address}</p>
                <DownloadBtn
                  handleDownload={handleDownload}
                  downloadLoading={downloadLoading}
                />
              </>
            }
          />
          {subdomainData.desiredPositions.length > 0 && (
            <GeneralInfoCard
              title="Ieškomos pareigos"
              content={subdomainData.desiredPositions.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            />
          )}
          {subdomainData.expectedSalary && (
            <GeneralInfoCard
              title="Pageidaujamas atlygis"
              content={`${subdomainData.expectedSalary} EUR`}
            />
          )}
          {subdomainData.languages.length > 0 && (
            <GeneralInfoCard
              title="Kalbos"
              content={subdomainData.languages.map((item, index) => (
                <p key={index}>
                  {item.language} - {LanguageLevel[item.level]}
                </p>
              ))}
            />
          )}
          {subdomainData.drivingLicences.length > 0 && (
            <GeneralInfoCard
              title="Vairuotojo pažymėjimas"
              content={subdomainData.drivingLicences.map((item, index) => (
                <p key={index}>
                  {item.category} - {getDateDiffString(item.issuedAt)}
                </p>
              ))}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MinimalisticDesignLayout;
