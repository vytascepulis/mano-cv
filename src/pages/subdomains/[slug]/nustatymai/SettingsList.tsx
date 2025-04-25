import Setting from "@/pages/subdomains/[slug]/nustatymai/Setting";
import Input from "@/components/ui/Input";
import InputPills from "@/components/ui/InputPills";
import InfoCards from "@/components/InfoCards";
import ToggleCards from "@/components/ToggleCards";
import PhotoUpload from "@/components/PhotoUpload";
import staticData from "./data.json";
import { useSettings } from "@/contexts/SettingsContext";
import ToggleCard from "@/components/ToggleCards/ToggleCard";
import { IToggleCard } from "@/components/ToggleCards/types";

const SettingsList = () => {
  const { handleOnChange, handleOnDesignPreview, settings, isEditing } =
    useSettings();

  const {
    settings: texts,
    experienceTexts,
    educationTexts,
    designs,
  } = staticData;

  const textLg = (text: string) => {
    return <p className="text-xl">{text}</p>;
  };

  const textSm = (text: string) => {
    return <p className="text-sm">{text}</p>;
  };

  return (
    <div className="mx-auto box-content flex max-w-[800px] flex-col gap-8 px-0 py-10 lg:px-3 lg:py-24">
      <Setting title={texts.image.title} subtitle={texts.image.subtitle}>
        <PhotoUpload
          disabled={!isEditing}
          image={settings.image}
          onUpload={(data) => handleOnChange("image", data)}
        />
      </Setting>
      <Setting title={texts.fullName.title} subtitle={texts.fullName.subtitle}>
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
        {!isEditing && textLg(settings.fullName)}
      </Setting>
      <Setting
        title={texts.phoneNumber.title}
        subtitle={texts.phoneNumber.subtitle}
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
        {!isEditing && textLg(settings.phoneNumber)}
      </Setting>
      <Setting title={texts.email.title} subtitle={texts.email.subtitle}>
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
        {!isEditing && textLg(settings.email)}
      </Setting>
      <Setting title={texts.address.title} subtitle={texts.address.subtitle}>
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
        {!isEditing && textLg(settings.address)}
      </Setting>
      <Setting title={texts.intro.title} subtitle={texts.intro.subtitle}>
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
        {!isEditing && textSm(settings.intro)}
      </Setting>
      <Setting title={texts.skills.title} subtitle={texts.skills.subtitle}>
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
        title={texts.languages.title}
        subtitle={texts.languages.subtitle}
      >
        <InputPills
          pills={settings.languages}
          className="lg:max-w-[300px]"
          onChange={(val) => handleOnChange("languages", val)}
          placeholder="Lietuvių - gimtoji"
          addBtnChildren="Pridėti"
          disabled={!isEditing}
        />
      </Setting>
      <Setting
        title={texts.experience.title}
        subtitle={texts.experience.subtitle}
      >
        <InfoCards
          onAdd={(cards) => handleOnChange("experience", cards)}
          options={experienceTexts}
          cards={settings.experience}
          disabled={!isEditing}
        />
      </Setting>
      <Setting
        title={texts.education.title}
        subtitle={texts.education.subtitle}
      >
        <InfoCards
          onAdd={(cards) => handleOnChange("education", cards)}
          options={educationTexts}
          cards={settings.education}
          disabled={!isEditing}
        />
      </Setting>
      <Setting
        title={texts.desiredPosition.title}
        subtitle={texts.desiredPosition.subtitle}
      >
        <InputPills
          pills={settings.desiredPosition}
          className="lg:max-w-[300px]"
          onChange={(val) => handleOnChange("desiredPosition", val)}
          placeholder="Programuotojas"
          addBtnChildren="Pridėti"
          disabled={!isEditing}
        />
      </Setting>
      <Setting
        title={texts.expectedSalary.title}
        subtitle={texts.expectedSalary.subtitle}
      >
        {isEditing && (
          <Input
            type="number"
            onChange={(val) =>
              handleOnChange("expectedSalary", Math.floor(+val).toString())
            }
            placeholder="XXXX"
            className="lg:max-w-[300px]"
            disabled={!isEditing}
            defaultValue={settings.expectedSalary}
          />
        )}
        {!isEditing && textLg(`${settings.expectedSalary}€`)}
      </Setting>
      <Setting
        title={texts.websiteDesign.title}
        subtitle={texts.websiteDesign.subtitle}
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
            selectedSlug={settings.websiteDesign}
          />
        )}
      </Setting>
    </div>
  );
};

export default SettingsList;
