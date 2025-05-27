import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { LanguageEntry, LanguageLevel } from "@/types/types";
import Button from "@/components/ui/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    <div className="flex w-full flex-col">
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex w-full flex-col gap-2 md:flex-row"
        >
          <Input
            type="text"
            placeholder="Kalba"
            onChange={setLangValue}
            defaultValue={langValue}
            required
            className="shrink-0 basis-0 md:basis-[120px]"
          />
          <Select
            options={langLevelOptions}
            initialValue={langLevelOptions[1]}
            onChange={(val) =>
              setLangLevel(val.value as keyof typeof LanguageLevel)
            }
          />
          <Button type="submit">Pridėti</Button>
        </form>
      )}
      <div className="flex min-h-[34px] flex-row flex-wrap items-start gap-2 lg:justify-end">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="group bg-primary relative max-w-[230px] cursor-default rounded-full px-[10px] py-[5px] text-center font-bold text-wrap wrap-break-word text-white"
          >
            {lang.language} - {LanguageLevel[lang.level]}
            {isEditing && (
              <button
                className="invisible absolute top-[-7px] right-[-7px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-violet-900 group-hover:visible"
                onClick={() => handleDelete(lang)}
              >
                <FontAwesomeIcon className="text-light" icon={faXmark} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
