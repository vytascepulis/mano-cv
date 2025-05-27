import Setting from "@/pages/subdomains/[slug]/nustatymai/Setting";
import Input from "@/components/ui/Input";
import InputPills from "@/components/ui/InputPills";
import InfoCards from "@/components/InfoCards";
import ToggleCards from "@/components/ToggleCards";
import PhotoUpload from "@/components/PhotoUpload";
import { settingsData } from "@/staticData/settings";
import { useSettings } from "@/contexts/SettingsContext";
import ToggleCard from "@/components/ToggleCards/ToggleCard";
import { IToggleCard } from "@/components/ToggleCards/types";
import LanguageSelect from "@/components/LanguageSelect";
import DrivingLicence from "@/components/DrivingLicenceInput";

const SettingsList = () => {
  const { handleOnChange, handleOnDesignPreview, settings, isEditing } =
    useSettings();

  const { settingsList, experienceTexts, educationTexts, designs } =
    settingsData;

  const textLg = (text: string) => {
    return <p className="text-xl">{text}</p>;
  };

  const textSm = (text: string) => {
    return <p className="text-sm">{text}</p>;
  };

  return (
    <div className="mx-auto box-content flex max-w-[800px] flex-col gap-8 px-0 py-10 lg:px-3 lg:py-24">
      <Setting
        title={settingsList.image.title}
        subtitle={settingsList.image.subtitle}
        optional={settingsList.image.optional}
      >
        <PhotoUpload
          disabled={!isEditing}
          image={settings.image}
          onUpload={(data) => handleOnChange("image", data)}
        />
      </Setting>
      <Setting
        title={settingsList.fullName.title}
        subtitle={settingsList.fullName.subtitle}
        optional={settingsList.fullName.optional}
      >
        {isEditing && (
          <Input
            type="text"
            onChange={(val) => handleOnChange("fullName", val)}
            placeholder="Vardas Pavardė"
            className="lg:max-w-[300px]"
            minLength={5}
            required
            disabled={!isEditing}
            defaultValue={settings.fullName}
          />
        )}
        {!isEditing && textLg(settings.fullName ?? "")}
      </Setting>
      <Setting
        title={settingsList.phoneNumber.title}
        subtitle={settingsList.phoneNumber.subtitle}
        optional={settingsList.phoneNumber.optional}
      >
        {isEditing && (
          <Input
            type="text"
            onChange={(val) => handleOnChange("phoneNumber", val)}
            placeholder="+37000000000"
            className="lg:max-w-[300px]"
            minLength={5}
            required
            disabled={!isEditing}
            defaultValue={settings.phoneNumber}
          />
        )}
        {!isEditing && textLg(settings.phoneNumber ?? "")}
      </Setting>
      <Setting
        title={settingsList.email.title}
        subtitle={settingsList.email.subtitle}
        optional={settingsList.email.optional}
      >
        {isEditing && (
          <Input
            type="email"
            onChange={(val) => handleOnChange("email", val)}
            placeholder="mano@elpastas.lt"
            className="lg:max-w-[300px]"
            minLength={5}
            required
            disabled={!isEditing}
            defaultValue={settings.email}
          />
        )}
        {!isEditing && textLg(settings.email ?? "")}
      </Setting>
      <Setting
        title={settingsList.address.title}
        subtitle={settingsList.address.subtitle}
        optional={settingsList.address.optional}
      >
        {isEditing && (
          <Input
            type="text"
            onChange={(val) => handleOnChange("address", val)}
            placeholder="Šalis, miestas"
            className="lg:max-w-[300px]"
            minLength={5}
            required
            disabled={!isEditing}
            defaultValue={settings.address}
          />
        )}
        {!isEditing && textLg(settings.address ?? "")}
      </Setting>
      <Setting
        title={settingsList.intro.title}
        subtitle={settingsList.intro.subtitle}
        optional={settingsList.intro.optional}
      >
        {isEditing && (
          <Input
            type="textarea"
            onChange={(val) => handleOnChange("intro", val)}
            placeholder="Keletas sakinių apie tave"
            className="lg:max-w-[300px]"
            disabled={!isEditing}
            defaultValue={settings.intro}
          />
        )}
        {!isEditing && textSm(settings.intro ?? "")}
      </Setting>
      <Setting
        title={settingsList.skills.title}
        subtitle={settingsList.skills.subtitle}
        optional={settingsList.skills.optional}
      >
        <InputPills
          pills={settings.skills}
          className="lg:max-w-[300px]"
          onChange={(val) => handleOnChange("skills", val)}
          placeholder="Kruopštumas"
          addBtnChildren="Pridėti"
          disabled={!isEditing}
        />
      </Setting>

      <Setting
        title={settingsList.experience.title}
        subtitle={settingsList.experience.subtitle}
        optional={settingsList.experience.optional}
      >
        <InfoCards
          onAdd={(cards) => handleOnChange("experience", cards)}
          options={experienceTexts}
          cards={settings.experience}
          disabled={!isEditing}
          name="experience"
        />
      </Setting>
      <Setting
        title={settingsList.education.title}
        subtitle={settingsList.education.subtitle}
        optional={settingsList.education.optional}
      >
        <InfoCards
          onAdd={(cards) => handleOnChange("education", cards)}
          options={educationTexts}
          cards={settings.education}
          disabled={!isEditing}
          name="education"
        />
      </Setting>
      <Setting
        title={settingsList.languages.title}
        subtitle={settingsList.languages.subtitle}
        optional={settingsList.languages.optional}
      >
        <LanguageSelect />
      </Setting>
      <Setting
        title={settingsList.drivingLicences.title}
        subtitle={settingsList.drivingLicences.subtitle}
        optional={settingsList.drivingLicences.optional}
      >
        <DrivingLicence />
      </Setting>
      <Setting
        title={settingsList.desiredPosition.title}
        subtitle={settingsList.desiredPosition.subtitle}
        optional={settingsList.desiredPosition.optional}
      >
        <InputPills
          pills={settings.desiredPositions}
          className="lg:max-w-[300px]"
          onChange={(val) => handleOnChange("desiredPositions", val)}
          placeholder="Programuotojas"
          addBtnChildren="Pridėti"
          disabled={!isEditing}
        />
      </Setting>
      <Setting
        title={settingsList.expectedSalary.title}
        subtitle={settingsList.expectedSalary.subtitle}
        optional={settingsList.expectedSalary.optional}
      >
        {isEditing && (
          <Input
            type="number"
            onChange={(val) => handleOnChange("expectedSalary", val)}
            placeholder="XXXX"
            className="lg:max-w-[300px]"
            disabled={!isEditing}
            defaultValue={settings.expectedSalary || ""}
          />
        )}
        {!isEditing &&
          textLg(settings.expectedSalary ? `${settings.expectedSalary}€` : "")}
      </Setting>
      <Setting
        title={settingsList.websiteDesign.title}
        subtitle={settingsList.websiteDesign.subtitle}
        optional={settingsList.websiteDesign.optional}
      >
        {!isEditing && settings.websiteDesign && (
          <ToggleCard
            card={
              (designs as IToggleCard[]).find(
                (i) => i.slug === settings.websiteDesign,
              )!
            }
            isSelected={true}
          />
        )}
        {isEditing && (
          <ToggleCards
            options={{
              onView: ({ slug }) => handleOnDesignPreview(slug),
              onSelect: ({ slug }) => handleOnChange("websiteDesign", slug),
            }}
            cards={designs as IToggleCard[]}
            selectedSlug={settings.websiteDesign || ""}
          />
        )}
      </Setting>
      <Setting
        title={settingsList.websiteCode.title}
        subtitle={settingsList.websiteCode.subtitle}
      >
        {isEditing && (
          <Input
            type="number"
            onChange={(val) => {
              if (val.length <= 4) {
                handleOnChange("subdomainCode", Math.floor(+val).toString());
              }
            }}
            placeholder="XXXX"
            className="lg:max-w-[300px]"
            disabled={!isEditing}
            defaultValue={settings.subdomainCode}
            maxLength={4}
          />
        )}
        {!isEditing && textLg(settings.subdomainCode ?? "")}
      </Setting>
    </div>
  );
};

export default SettingsList;
