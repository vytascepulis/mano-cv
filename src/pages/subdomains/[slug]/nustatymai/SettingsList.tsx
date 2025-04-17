import Setting from "@/pages/subdomains/[slug]/nustatymai/Setting";
import Input from "@/components/ui/Input";
import { texts } from "@/pages/subdomains/[slug]/nustatymai/texts";
import InputPills from "@/components/ui/InputPills";
import Select from "@/components/ui/Select";
import InfoCards from "@/components/InfoCards";

const SettingsList = () => {
  return (
    <div className="mx-auto box-content flex max-w-[800px] flex-col gap-8 px-0 py-10 lg:px-3 lg:py-24">
      <Setting title={texts.image.title} subtitle={texts.image.subtitle}>
        photo module
      </Setting>
      <Setting title={texts.fullName.title} subtitle={texts.fullName.subtitle}>
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
        <Input
          type="text"
          onChange={(val) => console.log("val: ", val)}
          placeholder="Pavadinimas"
          className="lg:max-w-[300px]"
          label="alo label"
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
