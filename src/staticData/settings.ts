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
        "Įkelk savo nuotrauką, kad darbdavys galėtų tave atpažinti. Naudok profesionalią, aiškią nuotrauką",
    },
    fullName: {
      title: "Vardas ir pavardė",
      subtitle: "Įrašyk savo vardą ir pavardę, kurie bus rodomi tavo CV",
    },
    phoneNumber: {
      title: "Telefono numeris",
      subtitle: "Darbdaviai galės su tavimi greitai susisiekti",
    },
    email: {
      title: "El. paštas",
      subtitle:
        "Tavo pagrindinis el. paštas. Naudok tą, kurį tikrini dažniausiai",
      optional: true,
    },
    address: {
      title: "Gyvenamoji vieta",
      subtitle: "Įrašyk miestą, kuriame šiuo metu gyveni",
    },
    intro: {
      title: "Trumpas prisistatymas",
      subtitle:
        "Trumpai aprašyk save, savo stipriąsias savybes ir karjeros tikslus",
    },
    skills: {
      title: "Turimi įgūdžiai",
      subtitle:
        "Pridėk įgūdžius ir kompetencijas, kurie yra svarbūs tavo profesinėje srityje",
    },
    languages: {
      title: "Kalbos",
      subtitle: "Nurodyk kalbas, kurias moki bei žinių lygį",
      optional: true,
    },
    experience: {
      title: "Darbo patirtis",
      subtitle:
        "Įrašyk savo darbo patirtį: vietą, trukmę, pareigas ir atsakomybes",
      optional: true,
    },
    education: {
      title: "Išsilavinimas",
      subtitle:
        "Nurodyk mokymosi įstaigas, studijų programas ir įgytas kvalifikacijas",
    },
    desiredPosition: {
      title: "Ieškomos pareigos",
      subtitle:
        "Įrašyk pareigas, kurios tave domina. Tai padeda darbdaviams geriau tave suprasti",
      optional: true,
    },
    expectedSalary: {
      title: "Pageidaujamas atlygis",
      subtitle: "Nurodyk, kokio atlyginimo „į rankas“ tikiesi",
      optional: true,
    },
    websiteDesign: {
      title: "Dizainas",
      subtitle:
        "Pasirink CV dizainą, kuris geriausiai atspindi tavo asmenybę ir profesinį stilių",
    },
    subdomainCode: {
      title: "Svetainės kodas",
      subtitle:
        "Keturių skaitmenų kodas, kurį suvedus darbdavys galės peržiūrėti tavo asmeninę svetainę",
    },
    drivingLicences: {
      title: "Vairuotojo pažymėjimas",
      subtitle: "Įrašyk, kokias vairuotojo kategorijas turi ir kada jas įgijai",
      optional: true,
    },
    deleteAccount: {
      title: "Pašalinti paskyrą",
      subtitle: "Tai ištrins visus tavo duomenis iš mūsų duomenų bazės",
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
    titleLabel: "Įstaigos pavadinimas",
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
        "Klasikinis mano-cv stilius – aiškus, tvarkingas ir jaukus. Puikiai tinka norint atrodyti profesionaliai, bet ne pernelyg formaliai.",
    },
    {
      slug: "MODERN",
      title: "Modernus",
      description:
        "Išraiškingas, šiuolaikiškas, dinamiškas ir drąsus. Puikiai tinka norint išsiskirti, atskleisti kūrybiškumą ir perteikti šiuolaikišką požiūrį.",
    },
    {
      slug: "MINIMALISTIC",
      title: "Minimalistinis",
      description:
        "Paprastas, lengvai skaitomas stilius be jokių perteklinių elementų. Dėmesys tik svarbiausiai informacijai.",
    },
  ],
};
