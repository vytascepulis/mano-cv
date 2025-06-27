import Input from "@/components/ui/Input";
import { DrivingLicence } from "@/types/types";
import Button from "@/components/ui/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputDate from "@/components/ui/InputDate";
import { formatDate } from "@/utils/date";

const DrivingLicenceInput = () => {
  const {
    handleOnChange,
    settings: { drivingLicences },
    isEditing,
  } = useSettings();

  const [issuedAt, setIssuedAt] = useState<string | null>(null);
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!issuedAt) {
      return null;
    }

    const updatedLicences: DrivingLicence[] = [
      ...drivingLicences,
      { category: category.trim(), issuedAt, id: uuidv4() },
    ];

    setCategory("");
    handleOnChange("drivingLicences", updatedLicences);
  };

  const handleDelete = (drivingLicence: DrivingLicence) => {
    const filtered = drivingLicences.filter(
      (item) => item.id !== drivingLicence.id,
    );
    handleOnChange("drivingLicences", filtered);
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
            placeholder="Kategorija"
            onChange={setCategory}
            defaultValue={category}
            required
            className="md:max-w-[150px]"
          />
          <div>
            <InputDate
              placeholder="Data"
              required
              selectedDate={issuedAt ? new Date(issuedAt) : null}
              onChange={(val) => setIssuedAt(formatDate(val))}
            />
          </div>
          <Button type="submit">Pridėti</Button>
        </form>
      )}
      <div className="flex min-h-[34px] flex-row flex-wrap items-start gap-2 lg:justify-end">
        {drivingLicences.map((licence, idx) => (
          <div
            key={idx}
            className="bg-primary relative max-w-[230px] cursor-default rounded-full px-[10px] py-[5px] text-center font-bold text-wrap wrap-break-word text-white"
          >
            <strong>{licence.category}</strong> - {licence.issuedAt}
            {isEditing && (
              <button
                className="absolute top-[-7px] right-[-7px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-violet-900"
                onClick={() => handleDelete(licence)}
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

export default DrivingLicenceInput;
