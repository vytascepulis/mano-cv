import { LanguageLevel, SubdomainData } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faEnvelope,
  faFilePdf,
  faGraduationCap,
  faLocationDot,
  faPhone,
  faSchool,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { getUserPhoto } from "@/utils/user";
import style from "./style.module.css";
import arrowImage from "@/assets/arrow.png";
import { Card } from "@/components/InfoCards/types";
import { motion } from "motion/react";
import Footer from "@/components/layouts/Footer";
import { getDateDiffString } from "@/utils/date";
import Loader from "@/components/ui/Loader";

interface Props {
  subdomainData: SubdomainData;
  handleDownload: () => void;
  downloadLoading?: boolean;
  mock?: boolean;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      className={twMerge(
        style.animatedGradient,
        "flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-br px-5 py-2 text-lg font-semibold text-gray-50 md:w-auto",
        downloadLoading && "cursor-not-allowed",
      )}
      onClick={handleDownload}
    >
      <FontAwesomeIcon icon={faFilePdf} className="mr-3" />
      <div className="flex items-center justify-center gap-2">
        Atsisiųsti CV
        {downloadLoading && <Loader size="sm" />}
      </div>
    </button>
  );
};

const GeneralInfoCard = ({
  title,
  value,
}: {
  title: string;
  value: string[] | string;
}) => {
  return (
    <div
      className={twMerge(
        style.shadow,
        "rounded-xl bg-gray-50 px-6 py-3 md:py-6",
      )}
    >
      <div className="relative pr-3 pl-5">
        <div className="absolute left-0 h-full w-[5px] rounded-xl bg-gray-200" />
        <p className="text-primary mb-1 text-xl leading-6 font-semibold">
          {title}
        </p>
        {typeof value === "string" && (
          <span className="font-light">{value}</span>
        )}
        {Array.isArray(value) && (
          <ul className="flex flex-col">
            {value.map((item, index) => (
              <li key={index} className="font-light">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ClassicDesignLayout = ({
  subdomainData,
  handleDownload,
  downloadLoading,
  mock,
}: Props) => {
  const [expandedExperience, setExpandedExperience] = useState<string[]>([]);
  const educationTitle =
    subdomainData.experience.length > 0 ? "Mokslas ir darbas" : "Mokslas";

  const educationSubtitle = () => {
    if (subdomainData.experience.length > 0) {
      return (
        <>
          <span className="text-dark font-semibold">Mano</span>{" "}
          <span className="text-primary italic">išsilavinimas</span>
          <br />
          <span className="text-dark font-semibold">ir</span>{" "}
          <span className="text-primary italic">darbo patirtis</span>
        </>
      );
    }

    return (
      <>
        <span className="text-dark font-semibold">Mano</span>{" "}
        <span className="text-primary italic">išsilavinimas</span>
      </>
    );
  };

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
        poppins.className,
        "min-h-screen bg-linear-65 from-gray-50 to-violet-100 pt-[30px] md:pt-[150px]",
      )}
    >
      <div className="mx-auto box-content max-w-[1000px] px-4 md:px-10">
        <div className="flex flex-col items-center gap-[40px] md:flex-row md:items-start md:gap-[70px]">
          <div className="order-2 w-full md:order-1">
            <motion.p
              initial={{ opacity: 0, top: 30 }}
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
              className="relative text-lg md:mb-2 md:text-3xl"
            >
              👋🏼 Labas! <span className="text-primary">—</span>{" "}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, top: 30 }}
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative mb-3 text-3xl leading-tight md:mb-10 md:text-5xl"
            >
              Aš{" "}
              <span className="bg-linear-65 from-violet-800 to-violet-600 bg-clip-text font-semibold tracking-wide text-transparent">
                {subdomainData.fullName}
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              <p className="mb-5 text-sm leading-relaxed font-light whitespace-pre-line text-gray-500 md:mb-7 md:text-lg">
                {subdomainData.intro}
              </p>
              <DownloadBtn
                handleDownload={handleDownload}
                downloadLoading={downloadLoading}
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className={twMerge(
              style.photoContainer,
              "order-1 flex shrink-0 basis-[200px] items-center justify-center md:order-2 md:h-[300px] md:basis-[200px]",
            )}
          >
            <img
              src={getUserPhoto(subdomainData.image!, mock)}
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
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <div
            className={twMerge(
              style.line,
              style.right,
              "mt-[50px] mb-[50px] md:mt-[150px] md:mb-[80px]",
            )}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <p className="text-dark text-md text-center md:mb-2 md:text-lg">
              <FontAwesomeIcon
                className="text-primary mr-3"
                icon={faSquarePollVertical}
              />
              Ekspertizė ir gebėjimai
            </p>
            <p className="mb-7 text-center text-2xl md:mb-10 md:text-4xl">
              <span className="text-dark font-semibold">Mano</span>{" "}
              <span className="text-primary italic">įgūdžiai</span>
            </p>
            <div
              className={twMerge(
                style.shadow,
                "mx-auto max-w-[800px] rounded-xl bg-gray-50 px-6 py-3 md:px-13 md:py-6",
              )}
            >
              <ul className="flex flex-col flex-wrap md:flex-row md:gap-x-4">
                {subdomainData.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-md flex basis-[calc(50%-0.5rem)] items-start py-[3px] md:py-2 md:text-lg"
                  >
                    <span className="text-primary mr-4 text-4xl leading-[24px] md:leading-[30px]">
                      •
                    </span>{" "}
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-[-120px] left-[-130px] hidden opacity-50 md:block">
              <img
                className="w-[200px]"
                src={arrowImage.src}
                alt="Arrow image"
              />
            </div>
            <div className="absolute top-[-30px] right-[-80px] hidden rotate-[160deg] opacity-50 md:block">
              <img
                className="w-[200px]"
                src={arrowImage.src}
                alt="Arrow image"
              />
            </div>
          </motion.div>
          <div
            className={twMerge(
              style.line,
              "mt-[50px] mb-[50px] md:mt-[150px] md:mb-[80px]",
            )}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <p className="text-dark text-md text-center md:mb-2 md:text-lg">
              <FontAwesomeIcon className="text-primary mr-3" icon={faSchool} />
              {educationTitle}
            </p>
            <p className="mb-7 text-center text-2xl md:mb-[90px] md:text-4xl">
              {educationSubtitle()}
            </p>
            <div className="flex flex-col items-start justify-between gap-[30px] md:flex-row md:gap-10">
              {subdomainData.experience.length > 0 && (
                <div
                  className={twMerge(
                    style.shadow,
                    "w-full rounded-xl bg-gray-50 px-6 py-3 md:px-10 md:py-6",
                  )}
                >
                  <div className="flex items-center gap-8">
                    <span className="bg-primary flex h-[40px] w-[40px] items-center justify-center rounded-full">
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="text-lg text-gray-50"
                      />
                    </span>
                    <p className="text-2xl font-medium">Darbo patirtis</p>
                  </div>
                  <span className="my-6 block h-[2px] w-full bg-gray-200"></span>
                  <ul className="flex flex-col gap-4">
                    {subdomainData.experience.map((item) => (
                      <li key={item.id} className="relative pl-5">
                        <div className="absolute left-0 h-full w-[5px] rounded-xl bg-gray-200" />
                        <p className="mb-[3px] text-sm font-light">
                          {item.dateFrom} -{" "}
                          {item.dateTo ? item.dateTo : "dabar"}
                        </p>
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="mb-1 font-light">{item.subtitle}</p>
                        <p className="text-sm font-light whitespace-pre-line text-gray-600">
                          {formatExperienceDescription(item)}
                        </p>
                        {(item.description || "").length > 50 &&
                          !expandedExperience.includes(item.id) && (
                            <a
                              onClick={() =>
                                setExpandedExperience((prevState) => [
                                  ...prevState,
                                  item.id,
                                ])
                              }
                              className="text-primary mt-2 cursor-pointer text-xs font-semibold transition-colors hover:text-violet-500"
                            >
                              Rodyti daugiau
                            </a>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div
                className={twMerge(
                  style.shadow,
                  "w-full rounded-xl bg-gray-50 px-6 py-3 md:px-10 md:py-6",
                )}
              >
                <div className="flex items-center gap-8">
                  <span className="bg-primary flex h-[40px] w-[40px] items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-lg text-gray-50"
                    />
                  </span>
                  <p className="text-2xl font-medium">Išsilavinimas</p>
                </div>
                <span className="my-6 block h-[2px] w-full bg-gray-200"></span>
                <ul className="flex flex-col gap-4">
                  {subdomainData.education.map((item) => (
                    <li key={item.id} className="relative pl-5">
                      <div className="absolute left-0 h-full w-[5px] rounded-xl bg-gray-200" />
                      <p className="mb-[3px] text-sm font-light">
                        {item.dateFrom} - {item.dateTo ? item.dateTo : "dabar"}
                      </p>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="font-light">{item.subtitle}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tranform absolute top-0 left-[-220px] hidden scale-x-[-1] rotate-[200deg] opacity-50 md:block">
              <img
                className="w-[200px]"
                src={arrowImage.src}
                alt="Arrow image"
              />
            </div>
            <div className="absolute right-[-230px] bottom-[-120px] hidden scale-x-[-1] rotate-[10deg] transform opacity-50 md:block">
              <img
                className="w-[200px]"
                src={arrowImage.src}
                alt="Arrow image"
              />
            </div>
          </motion.div>
          <div
            className={twMerge(
              style.line,
              style.right,
              "mt-[50px] mb-[50px] md:mt-[150px] md:mb-[80px]",
            )}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <p className="text-dark mb-7 text-center text-2xl font-semibold md:mb-[90px] md:text-4xl">
              Bendra informacija
            </p>
            <div className="mx-auto flex max-w-[800px] flex-col items-start gap-3 md:flex-row md:gap-10">
              <div
                className={twMerge(
                  style.shadow,
                  "w-full rounded-xl bg-gray-50 px-6 py-3 md:py-6",
                )}
              >
                <div className="relative pr-3 pl-5">
                  <div className="absolute left-0 h-full w-[5px] rounded-xl bg-gray-200" />
                  <p className="text-primary mb-2 text-2xl font-semibold md:text-3xl">
                    Susisiekime
                  </p>
                  <ul className="mb-5">
                    <li className="flex flex-row items-center gap-4">
                      <FontAwesomeIcon
                        className="w-[20px] text-gray-300"
                        size="lg"
                        icon={faPhone}
                      />
                      <span className="font-light md:text-lg">
                        {subdomainData.phoneNumber}
                      </span>
                    </li>
                    {subdomainData.email && (
                      <li className="flex flex-row items-center gap-4">
                        <FontAwesomeIcon
                          className="w-[20px] text-gray-300"
                          size="lg"
                          icon={faEnvelope}
                        />
                        <span className="font-light md:text-lg">
                          {subdomainData.email}
                        </span>
                      </li>
                    )}
                    <li className="flex flex-row items-center gap-4">
                      <FontAwesomeIcon
                        className="w-[20px] text-gray-300"
                        size="lg"
                        icon={faLocationDot}
                      />
                      <span className="font-light md:text-lg">
                        {subdomainData.address}
                      </span>
                    </li>
                  </ul>
                  <DownloadBtn
                    handleDownload={handleDownload}
                    downloadLoading={downloadLoading}
                  />
                </div>
              </div>
              <div className="flex w-full shrink-0 basis-[350px] flex-col gap-3 md:gap-6">
                {subdomainData.desiredPositions.length > 0 && (
                  <GeneralInfoCard
                    title={"Ieškomos pareigos"}
                    value={subdomainData.desiredPositions}
                  />
                )}
                {subdomainData.expectedSalary && (
                  <GeneralInfoCard
                    title={"Pageidaujamas atlygis"}
                    value={`${subdomainData.expectedSalary} EUR`}
                  />
                )}
                {subdomainData.drivingLicences.length > 0 && (
                  <GeneralInfoCard
                    title={"Vairuotojo pažymėjimas"}
                    value={subdomainData.drivingLicences.map(
                      (i) => `${i.category} - ${getDateDiffString(i.issuedAt)}`,
                    )}
                  />
                )}
                {subdomainData.languages.length > 0 && (
                  <GeneralInfoCard
                    title="Kalbos"
                    value={subdomainData.languages.map(
                      (i) => `${i.language} - ${LanguageLevel[i.level]}`,
                    )}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ClassicDesignLayout;
