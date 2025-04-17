import Setting from "@/pages/subdomains/[slug]/nustatymai/Setting";
import Input from "@/components/ui/Input";
import InputPills from "@/components/ui/InputPills";
import Select from "@/components/ui/Select";
import InfoCards from "@/components/InfoCards";
import ToggleCards from "@/components/ToggleCards";
import PhotoUpload from "@/components/PhotoUpload";

const texts = {
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
    subtitle: "Pridėkite įgūdžius, kurie yra svarbūs jūsų profesinėje srityje.",
  },
  languages: {
    title: "Kalbos",
    subtitle: "Nurodykite kalbas, kurias mokate, ir jų mokėjimo lygį.",
  },
  experience: {
    title: "Darbo patirtis",
    subtitle:
      "Nurodykite, kur ir kiek metų dirbote, ką veikėte, kokias atsakomybes turėjote.",
  },
  education: {
    title: "Išsilavinimas",
    subtitle:
      "Nurodykite savo mokymosi įstaigas, studijų programas ir įgytus laipsnius.",
  },
  desiredPosition: {
    title: "Pageidaujamos pareigos",
    subtitle:
      "Įrašykite pareigas, kurios jus domina. Tai padeda darbdaviams geriau jus suprasti.",
  },
  expectedSalary: {
    title: "Norimas atlygis",
    subtitle: "Nurodykite, kokio atlyginimo tikitės.",
  },
  websiteDesign: {
    title: "Dizainas",
    subtitle:
      "Pasirinkite CV dizainą, kuris geriausiai atspindi jūsų asmenybę ir profesinį stilių.",
  },
};

const SettingsList = () => {
  return (
    <div className="mx-auto box-content flex max-w-[800px] flex-col gap-8 px-0 py-10 lg:px-3 lg:py-24">
      <Setting title={texts.image.title} subtitle={texts.image.subtitle}>
        <PhotoUpload
          initialPhoto={"https://mano-cv.lt/generic-user.png"}
          onUpload={(file) => console.log("upload: ", file)}
        />
      </Setting>
      <Setting title={texts.fullName.title} subtitle={texts.fullName.subtitle}>
        <ToggleCards
          options={{
            onView: (card) => console.log("view", card),
            onSelect: (card) => console.log("select", card),
          }}
          cards={[
            {
              id: "1",
              title: "Klasikinis",
              description:
                "Aiški struktūra, tradicinis išdėstymas. Puikiai tinka formaliems ar akademiniams CV",
            },
            {
              id: "2",
              title: "Modernus",
              description:
                "Švarus dizainas su akcentais ir vizualine hierarchija. Idealus kūrybinių sričių ar tech specialistams",
            },
            {
              id: "3",
              title: "Minimalistinis",
              description:
                "Paprastas, lengvai skaitomas stilius be jokių perteklinių elementų. Dėmesys tik svarbiausiai informacijai",
            },
          ]}
        />
      </Setting>
      <Select
        options={[
          { value: "test-value", label: "Test value" },
          { value: "test-value2", label: "Test value2" },
          { value: "test-value3", label: "Test value3" },
          { value: "mr-alo", label: "Mr. Alo" },
          { value: "mr-alo2", label: "Mr. Alo2" },
          { value: "mr-alo3", label: "Mr. Alo3" },
        ]}
        initialValue={{ value: "mr-alo", label: "Mr. Alo" }}
        onChange={(val) => console.log("selected: ", val)}
        label={"label bro"}
      />
      <Setting
        title={texts.phoneNumber.title}
        subtitle={texts.phoneNumber.subtitle}
      >
        <InputPills
          className="w-full lg:max-w-[300px]"
          onChange={(val) => console.log("val: ", val)}
          label={"pills label"}
        />
      </Setting>
      <Setting title={texts.email.title} subtitle={texts.email.subtitle}>
        <Input
          type="textarea"
          onChange={(val) => console.log("val: ", val)}
          placeholder="textarea"
          className="lg:max-w-[300px]"
          label="halo"
        />
      </Setting>
      <Setting title={texts.address.title} subtitle={texts.address.subtitle}>
        <InfoCards
          onAdd={(cards) => console.log("onAdd: ", cards)}
          options={{
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
          }}
          initialCards={[
            {
              id: "asd",
              title: "ENEBA 2",
              subtitle: "Programuotojas",
              description:
                "TTest description Test description Test description Test description Test description est description ",
              dateFrom: new Date("2024-04"),
              dateTo: null,
              isCurrent: true,
            },
            {
              id: "asd1",
              title: "ENEBA 1",
              subtitle: "Programuotojas",
              description:
                "TTest description Test description Test description Test description Test description est description ",
              dateFrom: new Date("2023-04"),
              dateTo: null,
              isCurrent: true,
            },
            {
              id: "asd2",
              title: "ENEBA 3",
              subtitle: "Programuotojas",
              description:
                "TTest description Test description Test description Test description Test description est description ",
              dateFrom: new Date("2025-04"),
              dateTo: null,
              isCurrent: true,
            },
          ]}
        />
      </Setting>
      <Setting title={texts.intro.title} subtitle={texts.intro.subtitle}>
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting title={texts.skills.title} subtitle={texts.skills.subtitle}>
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting
        title={texts.languages.title}
        subtitle={texts.languages.subtitle}
      >
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting
        title={texts.experience.title}
        subtitle={texts.experience.subtitle}
      >
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting
        title={texts.education.title}
        subtitle={texts.education.subtitle}
      >
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting
        title={texts.desiredPosition.title}
        subtitle={texts.desiredPosition.subtitle}
      >
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting
        title={texts.expectedSalary.title}
        subtitle={texts.expectedSalary.subtitle}
      >
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
      <Setting
        title={texts.websiteDesign.title}
        subtitle={texts.websiteDesign.subtitle}
      >
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
        />
      </Setting>
    </div>
  );
};

export default SettingsList;
