import { useEffect, useRef, useState } from "react";
import { WebsiteDesigns } from "@/types/enums";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";
import ClassicDesignLayout from "@/components/layouts/ClassicDesignLayout";
import ModernDesignLayout from "@/components/layouts/ModernDesignLayout";
import MinimalisticDesignLayout from "@/components/layouts/MinimalisticDesignLayout";
import { DrivingLicence, LanguageEntry } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { strToWebdesign, webdesignToStr } from "@/utils/settings";
import { getGenericUserPhoto } from "@/utils/user";
import logoLight from "@/assets/mano-cv-logo-light.png";
import { getDomainUrl } from "@/utils/subdomain";
import Head from "next/head";
import { usePosthogContext } from "@/contexts/PosthogContext";

const mockData = {
  address: "Vilnius, Lietuva",
  desiredPositions: ["Sandėlio darbuotojas", "Laiškininkas", "Pardavėjas"],
  expectedSalary: "1234",
  intro:
    "Esu motyvuotas, atsakingas ir komunikabilus, vertinantis tvarką ir aiškumą. Greitai mokausi, lengvai prisitaikau prie naujų situacijų ir sugebu dirbti tiek savarankiškai, tiek komandoje. Išsiskiriu kruopštumu, greita orientacija ir nuolatiniu siekiu tobulėti. Atsakingai žiūriu į pavestas užduotis ir visada siekiu aukščiausių rezultatų savo veikloje. Laisvalaikiu domiuosi saviugda, skaitau knygas, leidžiu laiką gamtoje. Man svarbu nuolatinis tobulėjimas ir pozityvus požiūris į gyvenimą.",
  image: getGenericUserPhoto(),
  email: "mano@elpastas.lt",
  fullName: "Vardis Pavardis",
  phoneNumber: "+12345678910",
  websiteDesign: "CLASSIC" as WebsiteDesigns,
  subdomainCode: "1234",
  experience: [
    {
      id: "fc2b5590-acb2-436b-9374-96e1f41dd945",
      title: "Darbovietė #2",
      subtitle: "Biuro administratorius",
      description:
        "Buvau atsakingas už biuro veiklos organizavimą: dokumentų ruošimą, skambučių priėmimą, sutarčių administravimą bei bendravimą su klientais. Padėjau užtikrinti sklandų kasdienį įmonės darbą ir palaikiau tvarką dokumentacijoje.",
      dateFrom: "2024-01",
      dateTo: "2025-02",
    },
    {
      id: "b438f2c6-1460-4a12-bfbd-a2295fdcd6e9",
      title: "Darbovietė #1",
      subtitle: "Pardavimų konsultantas",
      description:
        "Dirbau su klientais parduotuvėje, padėjau išsirinkti prekes, rūpinausi prekių išdėstymu ir sandėliavimu. Nuolat siekiau gerinti klientų patirtį ir padėjau komandai pasiekti pardavimų tikslus.",
      dateFrom: "2023-04",
      dateTo: "2023-11",
    },
  ],
  education: [
    {
      id: "292cf090-0bd9-49a5-a764-8e4e5c3cb58f",
      title: "Universiteto pavadinimas",
      subtitle: "Aukštasis - studijų programa",
      description: null,
      dateFrom: "2022-04",
      dateTo: null,
    },
    {
      id: "47b088fb-edcb-48f0-885d-73e596f14c7a",
      title: "Kursų organizatorius",
      subtitle: "Kurso pavadinimas",
      description: null,
      dateFrom: "2022-02",
      dateTo: "2022-05",
    },
    {
      id: "7c583d04-f2f0-4a7a-a93a-f39b3d00e714",
      title: "Mokyklos pavadinimas",
      subtitle: "Vidurinis",
      description: null,
      dateFrom: "2018-01",
      dateTo: "2022-02",
    },
  ],
  skills: [
    "Kruopštumas",
    "Atkaklumas",
    "Darbas komandoje",
    "Atsakingumas",
    "Organizuotumas",
    "Kantrybė",
    "Gebėjimas dirbti savarankiškai",
    "MS Word, Excel",
    "Photoshop",
  ],
  languages: [
    {
      language: "Lietuvių",
      level: "NATIVE",
      id: "56703912-d3a9-4d1f-9866-1c3c3ff666ce",
    },
    {
      language: "Anglų",
      level: "ADVANCED",
      id: "51f4da19-49e3-4a5d-9a03-679c6d5dbc20",
    },
    {
      language: "Prancūzų",
      level: "BEGINNER",
      id: "ba6ba2ab-8244-4849-a389-c37525a01c8c",
    },
  ] as LanguageEntry[],
  userStatus: "ACTIVE",
  subdomainStatus: "HIDDEN",
  drivingLicences: [
    {
      category: "B",
      issuedAt: "2022-02",
      id: "074f8237-179b-438b-bb86-a83688c3ac7a",
    },
    {
      category: "C",
      issuedAt: "2023-08",
      id: "4d11db78-4bb0-4bb4-9c13-ad9e74837063",
    },
  ] as DrivingLicence[],
};

const tabs = [
  { label: "Klasikinis", value: WebsiteDesigns.CLASSIC },
  { label: "Modernus", value: WebsiteDesigns.MODERN },
  { label: "Minimalistinis", value: WebsiteDesigns.MINIMALISTIC },
];

const Page = () => {
  const { capturePageView } = usePosthogContext();
  const router = useRouter();
  const stilius = router.query.stilius as string;
  const design = strToWebdesign(stilius);

  const [selectedDesign, setSelectedDesign] = useState<WebsiteDesigns | null>();
  const designWindowRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    const blob = await pdf(
      <PdfDocument mock userData={mockData} slug={""} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${mockData.fullName} CV (mano-cv.lt pavyzdys).pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderDesign = (design: WebsiteDesigns) => {
    switch (design) {
      case WebsiteDesigns.CLASSIC:
        return (
          <ClassicDesignLayout
            mock
            subdomainData={mockData}
            handleDownload={handleDownload}
          />
        );
      case WebsiteDesigns.MODERN:
        return (
          <ModernDesignLayout
            mock
            subdomainData={mockData}
            handleDownload={handleDownload}
          />
        );
      case WebsiteDesigns.MINIMALISTIC:
        return (
          <MinimalisticDesignLayout
            mock
            subdomainData={mockData}
            handleDownload={handleDownload}
          />
        );
      default:
        return null;
    }
  };

  const handleSelectDesign = (design: WebsiteDesigns) => {
    designWindowRef.current?.scrollTo(0, 0);
    setSelectedDesign(design);
    router.push({ query: { stilius: webdesignToStr(design) } });
  };

  useEffect(() => {
    setSelectedDesign(design);
  }, [design]);

  useEffect(() => {
    capturePageView({ name: "Examples page" });
  }, []);

  if (!router.isReady || !selectedDesign) return <Loader />;

  return (
    <>
      <Head>
        <title>mano-cv.lt - šablonai</title>
      </Head>
      <div className="border-primary flex h-screen flex-col border-4">
        <div className="bg-primary shrink-0">
          <div className="mx-auto box-content flex max-w-[1200px] flex-col items-center pt-3 pb-2 md:flex-row md:pb-5">
            <div className="mr-5 mb-3 shrink-0 md:mb-0">
              <a
                href={getDomainUrl()}
                className="cursor-pointer"
                target="_blank"
              >
                <img
                  src={logoLight.src}
                  className="h-[20px] object-contain md:h-[25px]"
                  alt="mano-cv.lt logo"
                />
              </a>
            </div>
            <div className="flex w-full justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  className={twMerge(
                    "bg-light/70 hover:bg-light/80 w-full cursor-pointer rounded-sm px-3 py-1 font-semibold transition-colors md:w-auto",
                    selectedDesign === tab.value && "bg-light hover:bg-light",
                  )}
                  key={tab.value}
                  onClick={() => handleSelectDesign(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="ml-5 w-[150px] shrink-0"></div>
          </div>
        </div>
        <div
          ref={designWindowRef}
          className="overflow-x-hidden overflow-y-scroll bg-violet-300"
        >
          {renderDesign(selectedDesign)}
        </div>
      </div>
    </>
  );
};

export default Page;
