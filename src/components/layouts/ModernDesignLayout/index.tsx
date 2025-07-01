import { LanguageLevel, SubdomainData } from "@/types/types";
import { Roboto, Roboto_Condensed } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { getUserPhoto } from "@/utils/user";
import { motion } from "motion/react";
import Marquee from "react-fast-marquee";
import { Card } from "@/components/InfoCards/types";
import React, { useState } from "react";
import Footer from "@/components/layouts/Footer";
import { getDateDiffString } from "@/utils/date";
import Loader from "@/components/ui/Loader";

interface Props {
  subdomainData: SubdomainData;
  handleDownload: () => void;
  downloadLoading?: boolean;
  mock?: boolean;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
  style: ["normal", "italic"],
});

const gradient = "bg-linear-to-br from-violet-100 to-violet-400";

const DownloadBtn = ({
  handleDownload,
  downloadLoading,
  size = "md",
}: {
  handleDownload: Props["handleDownload"];
  downloadLoading?: boolean;
  size?: "sm" | "md";
}) => {
  return (
    <div
      className={twMerge(
        gradient,
        "inline-block w-full rounded-full p-[3px] sm:w-max",
        size === "sm" && "w-max",
      )}
    >
      <button
        onClick={handleDownload}
        disabled={downloadLoading}
        className={twMerge(
          "bg-dark text-light flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2 text-lg font-semibold transition hover:opacity-90",
          size === "sm" && "text-sm font-normal",
          downloadLoading && "cursor-not-allowed opacity-90",
        )}
      >
        Atsisiųsti CV
        {downloadLoading && <Loader size="sm" />}
      </button>
    </div>
  );
};

const GeneralInfoCard = ({
  title,
  subtitle,
  dateFrom,
  dateTo,
}: {
  title: string;
  subtitle: React.ReactNode;
  dateFrom?: string;
  dateTo?: string | null;
}) => {
  return (
    <div className="flex flex-row items-start gap-5 md:gap-8">
      <span
        className={twMerge(
          "mt-[8px] shrink-0",
          dateFrom && "mt-[27px]",
          "block h-3 w-3 rounded-full bg-violet-300",
        )}
      />
      <div className="w-full">
        {dateFrom && (
          <p className="mb-1 text-xs text-violet-200">
            {dateFrom} - {dateTo ? dateTo : "dabar"}
          </p>
        )}
        <p className="mb-1 text-xl font-semibold">{title}</p>
        <div className={twMerge(robotoCondensed.className, "text-slate-400")}>
          {subtitle}
        </div>
      </div>
    </div>
  );
};

const ModernDesignLayout = ({
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
  return (
    <div
      className={twMerge(
        roboto.className,
        "min-h-screen bg-linear-to-b from-gray-900 to-gray-800",
        "text-light",
      )}
    >
      <div className="mx-auto box-content max-w-[900px] px-4 pt-[50px] md:px-5 md:pt-[120px]">
        <div className="mx-auto mb-[80px] flex flex-col items-start md:mb-[130px] md:items-center">
          <div className={twMerge(gradient, "mx-auto mb-7 rounded-full p-1")}>
            <img
              className="max-h-[150px] rounded-full md:max-h-[200px]"
              src={getUserPhoto(subdomainData.image!, mock)}
              alt={subdomainData.fullName}
            />
          </div>
          <motion.p
            initial={{
              opacity: 0,
              top: 40,
            }}
            animate={{
              opacity: 1,
              top: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
            className={twMerge(
              robotoCondensed.className,
              "relative mb-3 text-xl font-extralight md:text-2xl",
            )}
          >
            👋 Labas!
          </motion.p>
          <motion.p
            initial={{
              opacity: 0,
              top: 40,
            }}
            animate={{
              opacity: 1,
              top: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="relative mb-5 text-3xl leading-tight font-semibold md:mb-8 md:text-5xl"
          >
            Aš{" "}
            <span
              className={twMerge(
                gradient,
                "bg-clip-text tracking-wide text-transparent",
              )}
            >
              {subdomainData.fullName}
            </span>
          </motion.p>
          <motion.p
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 1,
              ease: "easeOut",
            }}
            className={twMerge(
              robotoCondensed.className,
              "mb-8 inline-block max-w-[600px] overflow-hidden font-light md:text-center",
            )}
          >
            {subdomainData.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", delay: 1.5 }}
            className="w-full sm:w-auto"
          >
            <DownloadBtn
              handleDownload={handleDownload}
              downloadLoading={downloadLoading}
            />
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", delay: 1.5 }}
      >
        <div className="mb-[70px] h-[50px] w-full -skew-y-2 overflow-hidden md:mb-[150px]">
          <Marquee
            speed={30}
            autoFill
            className={twMerge(
              gradient,
              robotoCondensed.className,
              "text-dark flex h-full flex-row items-center text-xl uppercase",
            )}
          >
            {subdomainData.skills.map((skill, index) => (
              <div className="flex shrink-0 items-center" key={index}>
                <span className="mx-10 block h-[10px] w-[10px] rounded-full bg-violet-900" />
                {skill}
              </div>
            ))}
          </Marquee>
        </div>
        <div className="mx-auto box-content max-w-[900px] px-4 md:px-5">
          <div className="mx-auto mb-[70px] md:mb-[150px]">
            <h1
              className={twMerge(
                gradient,
                "mb-[10px] bg-clip-text text-center text-4xl font-bold tracking-wide text-transparent uppercase md:mb-[50px] md:text-5xl",
              )}
            >
              Mano patirtis
            </h1>
            <div className="flex flex-col divide-y divide-gray-600">
              {subdomainData.experience.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 py-[20px] md:flex-row md:gap-10 md:py-[40px]"
                >
                  <div className="w-full">
                    <p className="mb-1 text-2xl font-semibold">
                      {item.subtitle},{" "}
                      <span
                        className={twMerge(
                          gradient,
                          "bg-clip-text text-transparent",
                        )}
                      >
                        {item.title}
                      </span>
                    </p>
                    <p className="text-sm font-light italic md:text-base">
                      {item.dateFrom} - {item.dateTo ? item.dateTo : "dabar"}
                    </p>
                  </div>
                  <p
                    className={twMerge(
                      robotoCondensed.className,
                      "w-full leading-normal font-light md:text-lg",
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
                          className="mt-2 block w-max cursor-pointer text-xs font-semibold text-violet-400 transition-colors hover:text-violet-500"
                        >
                          Rodyti daugiau
                        </a>
                      )}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {subdomainData.education.length > 0 && (
            <div className="mb-[70px] flex flex-col gap-[30px] md:mb-[150px] md:flex-row">
              <h1
                className={twMerge(
                  gradient,
                  "w-full bg-clip-text text-center text-4xl leading-tight font-bold text-transparent uppercase md:text-start md:text-5xl",
                )}
              >
                Išsilavinimas
              </h1>
              <div className="bg-dark/30 flex w-full flex-col gap-7 rounded-md border-1 border-gray-600 p-5 md:p-8">
                {subdomainData.education.map((item) => (
                  <GeneralInfoCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    dateFrom={item.dateFrom}
                    dateTo={item.dateTo}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-[30px] md:flex-row">
            <h1
              className={twMerge(
                gradient,
                "w-full bg-clip-text text-center text-4xl leading-tight font-bold text-transparent uppercase md:text-start md:text-5xl",
              )}
            >
              Bendra informacija
            </h1>
            <div className="bg-dark/30 flex w-full flex-col gap-7 rounded-md border-1 border-gray-600 p-5 md:p-8">
              <GeneralInfoCard
                title="Kontaktai"
                subtitle={
                  <div className="flex w-full flex-col md:w-auto">
                    <p>{subdomainData.phoneNumber}</p>
                    {subdomainData.email && <p>{subdomainData.email}</p>}
                    <p className="mb-3">{subdomainData.address}</p>
                    <DownloadBtn
                      size="sm"
                      handleDownload={handleDownload}
                      downloadLoading={downloadLoading}
                    />
                  </div>
                }
              />
              {subdomainData.desiredPositions.length > 0 && (
                <GeneralInfoCard
                  title="Ieškomos pareigos"
                  subtitle={subdomainData.desiredPositions.map(
                    (item, index) => (
                      <p key={index}>{item}</p>
                    ),
                  )}
                />
              )}
              {subdomainData.expectedSalary && (
                <GeneralInfoCard
                  title="Pageidaujamas atlygis"
                  subtitle={`${subdomainData.expectedSalary} EUR`}
                />
              )}
              {subdomainData.languages.length > 0 && (
                <GeneralInfoCard
                  title="Kalbos"
                  subtitle={subdomainData.languages.map((item, index) => (
                    <p key={index}>
                      {item.language} - {LanguageLevel[item.level]}
                    </p>
                  ))}
                />
              )}
              {subdomainData.drivingLicences.length > 0 && (
                <GeneralInfoCard
                  title="Vairuotojo pažymėjimas"
                  subtitle={subdomainData.drivingLicences.map((item, index) => (
                    <p key={index}>
                      {item.category} - {getDateDiffString(item.issuedAt)}
                    </p>
                  ))}
                />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default ModernDesignLayout;
