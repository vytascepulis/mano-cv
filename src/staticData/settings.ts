export interface SettingField {
  title: string;
  subtitle: string;
  optional?: boolean;
}

export interface Setting {
  [key: string]: SettingField;
}

export interface SectionTexts {
  addNewBtnChildren: string;
  titleLabel: string;
  titlePlaceholder: string;
  subtitleLabel: string;
  subtitlePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  dateFromLabel: string;
  dateToLabel: string;
  dateNowLabel: string;
  editModalTitle: string;
  deleteModalTitle: string;
}

export interface Design {
  slug: string;
  title: string;
  description: string;
}

export const settingsData: {
  settingsList: Setting;
  experienceTexts: SectionTexts;
  educationTexts: SectionTexts;
  designs: Design[];
} = {
  settingsList: {
    image: {
      title: "Nuotrauka",
      subtitle:
        "Įkelkite savo nuotrauką, kad darbdavys galėtų jus atpažinti. Naudokite profesionalią, aiškią nuotrauką.",
    },
    fullName: {
      title: "Vardas ir pavardė",
      subtitle: "Įrašykite savo vardą ir pavardę, kurie bus rodomi jūsų CV.",
    },
    phoneNumber: {
      title: "Telefono numeris",
      subtitle: "Darbdaviai galės su jumis greitai susisiekti.",
    },
    email: {
      title: "El. paštas",
      subtitle:
        "Jūsų pagrindinis el. paštas. Naudokite tą, kurį tikrinate dažniausiai.",
      optional: true,
    },
    address: {
      title: "Gyvenamoji vieta",
      subtitle: "Įrašykite miestą, kuriame šiuo metu gyvenate.",
    },
    intro: {
      title: "Trumpas pristatymas",
      subtitle:
        "Trumpai aprašykite save, savo stipriąsias puses ir karjeros tikslus.",
    },
    skills: {
      title: "Turimi įgūdžiai",
      subtitle:
        "Pridėkite įgūdžius, kurie yra svarbūs jūsų profesinėje srityje.",
    },
    languages: {
      title: "Kalbos",
      subtitle: "Nurodykite kalbas, kurias mokate, ir jų mokėjimo lygį.",
      optional: true,
    },
    experience: {
      title: "Darbo patirtis",
      subtitle:
        "Nurodykite, kur ir kiek metų dirbote, ką veikėte, kokias atsakomybes turėjote.",
      optional: true,
    },
    education: {
      title: "Išsilavinimas",
      subtitle:
        "Nurodykite savo mokymosi įstaigas, studijų programas ir įgytus laipsnius.",
    },
    desiredPosition: {
      title: "Ieškomos pareigos",
      subtitle:
        "Įrašykite pareigas, kurios jus domina. Tai padeda darbdaviams geriau jus suprasti.",
      optional: true,
    },
    expectedSalary: {
      title: "Pageidaujamas atlygis",
      subtitle: "Nurodykite eurais, kokio atlyginimo į rankas tikitės.",
      optional: true,
    },
    websiteDesign: {
      title: "Dizainas",
      subtitle:
        "Pasirinkite CV dizainą, kuris geriausiai atspindi jūsų asmenybę ir profesinį stilių.",
    },
    websiteCode: {
      title: "Svetainės kodas",
      subtitle: "Keturių skaičių kodas, kurį įvedus atsidarys jūsų CV svetainė",
    },
    drivingLicences: {
      title: "Vairuotojo pažymėjimas",
      subtitle: "Nurodykite vairavimo kategorijas bei įgijimo datą",
      optional: true,
    },
  },
  experienceTexts: {
    addNewBtnChildren: "Pridėti",
    titleLabel: "Pavadinimas",
    titlePlaceholder: "UAB XXXX",
    subtitleLabel: "Pareigos",
    subtitlePlaceholder: "Prekių surinkėjas",
    descriptionLabel: "Aprašymas",
    descriptionPlaceholder: "Vitrinų priežiūra, pristatymų ruoša, ...",
    dateFromLabel: "Pradžia",
    dateToLabel: "Pabaiga",
    dateNowLabel: "Dirbu dabar",
    editModalTitle: "Darbovietės informacija",
    deleteModalTitle: "Ištrinti įrašą",
  },
  educationTexts: {
    addNewBtnChildren: "Pridėti",
    titleLabel: "Pavadinimas",
    titlePlaceholder: "",
    subtitleLabel: "Išsilavinimas, studijų programa",
    subtitlePlaceholder: "Vidurinis, aukštasis",
    descriptionLabel: "Aprašymas",
    descriptionPlaceholder: "",
    dateFromLabel: "Pradžia",
    dateToLabel: "Pabaiga",
    dateNowLabel: "Mokausi dabar",
    editModalTitle: "Išsilavinimas",
    deleteModalTitle: "Ištrinti įrašą",
  },
  designs: [
    {
      slug: "CLASSIC",
      title: "Klasikinis",
      description:
        "Aiški struktūra, tradicinis išdėstymas. Puikiai tinka formaliems ar akademiniams CV",
    },
    {
      slug: "MODERN",
      title: "Modernus",
      description:
        "Švarus dizainas su akcentais ir vizualine hierarchija. Idealus kūrybinių sričių ar tech specialistams",
    },
    {
      slug: "MINIMALISTIC",
      title: "Minimalistinis",
      description:
        "Paprastas, lengvai skaitomas stilius be jokių perteklinių elementų. Dėmesys tik svarbiausiai informacijai",
    },
  ],
};
