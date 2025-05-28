import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { LanguageEntry, LanguageLevel } from "@/types/types";
import Button from "@/components/ui/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Pill from "@/components/ui/Pill";

const LanguageSelect = () => {
  const {
    handleOnChange,
    settings: { languages },
    isEditing,
  } = useSettings();

  const langLevelOptions = Object.entries(LanguageLevel).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  const [langLevel, setLangLevel] = useState(
    langLevelOptions[1].value as keyof typeof LanguageLevel,
  );

  const [langValue, setLangValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedLangs = [
      ...languages,
      { language: langValue.trim(), level: langLevel, id: uuidv4() },
    ];

    setLangValue("");
    handleOnChange("languages", updatedLangs);
  };

  const handleDelete = (language: LanguageEntry) => {
    const filtered = languages.filter((item) => item.id !== language.id);
    handleOnChange("languages", filtered);
  };

  return (
    <div className="flex w-full flex-col md:w-auto">
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex w-full flex-col gap-2 md:w-auto md:flex-row lg:justify-end"
        >
          <Input
            type="text"
            placeholder="Kalba"
            onChange={setLangValue}
            defaultValue={langValue}
            required
            className="md:max-w-[150px]"
          />
          <div className="md:max-w-[120px]">
            <Select
              options={langLevelOptions}
              initialValue={langLevelOptions[1]}
              onChange={(val) =>
                setLangLevel(val.value as keyof typeof LanguageLevel)
              }
            />
          </div>
          <Button type="submit">Pridėti</Button>
        </form>
      )}
      <div className="flex min-h-[34px] flex-row flex-wrap items-start gap-2 lg:justify-end">
        {languages.map((lang, idx) => (
          <Pill
            key={idx}
            disabled={!isEditing}
            onDeleteClick={() => handleDelete(lang)}
          >
            {lang.language} - {LanguageLevel[lang.level]}
          </Pill>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
