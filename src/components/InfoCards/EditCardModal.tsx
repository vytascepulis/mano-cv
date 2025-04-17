import { Card, CardOptions, ModalState } from "@/components/InfoCards/types";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import InputDate from "@/components/ui/InputDate";
import { useEffect, useState } from "react";
import Checkbox from "@/components/ui/Checkbox";

interface Props {
  state: ModalState | null;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (card: Card) => void;
  options: CardOptions;
}

const EditCardModal = ({
  state,
  isOpen,
  onSubmit,
  handleClose,
  options,
}: Props) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;

    onSubmit({
      id: state?.selectedCard?.id || "",
      title,
      subtitle,
      description,
      dateFrom: dateFrom!,
      dateTo,
      isCurrent,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsCurrent(checked);
    if (checked) {
      setDateTo(null);
    }
  };

  useEffect(() => {
    setDateFrom(state?.selectedCard?.dateFrom || null);
    setDateTo(state?.selectedCard?.dateTo || null);
    setIsCurrent(Boolean(state?.selectedCard?.isCurrent));
  }, [state]);

  const submitBtnColor = state?.mode === "delete" ? "danger" : "primary";

  const getModalTitle = () => {
    switch (state?.mode) {
      case "delete":
        return options.deleteModalTitle;
      default:
        return options.editModalTitle;
    }
  };

  const getSubmitBtnText = () => {
    switch (state?.mode) {
      case "delete":
        return "Ištrinti";
      case "new":
        return "Pridėti";
      default:
        return "Atnaujinti";
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h1 className="mb-5 text-2xl">{getModalTitle()}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          label={options.titleLabel}
          placeholder={options.titlePlaceholder}
          required
          defaultValue={state?.selectedCard?.title}
          name="title"
          disabled={state?.mode === "delete"}
        />
        <Input
          type="text"
          label={options.subtitleLabel}
          placeholder={options.subtitlePlaceholder}
          required
          defaultValue={state?.selectedCard?.subtitle}
          name="subtitle"
          disabled={state?.mode === "delete"}
        />
        <Input
          type="textarea"
          label={options.descriptionLabel}
          placeholder={options.descriptionPlaceholder}
          required
          defaultValue={state?.selectedCard?.description}
          name="description"
          disabled={state?.mode === "delete"}
        />
        <div className="flex flex-col gap-4 sm:flex-row">
          <InputDate
            selectedDate={dateFrom}
            onChange={setDateFrom}
            required
            label={options.dateFromLabel}
            placeholder="MMMM-mm"
            disabled={state?.mode === "delete"}
          />
          <div className="flex flex-col gap-2">
            <InputDate
              selectedDate={dateTo}
              onChange={setDateTo}
              required
              label={options.dateToLabel}
              placeholder="MMMM-mm"
              disabled={isCurrent || state?.mode === "delete"}
            />
            {state?.mode !== "delete" && (
              <Checkbox
                label={options.dateNowLabel}
                name="current-checkbox"
                checked={isCurrent}
                onChange={handleCheckboxChange}
              />
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Button type="submit" color={submitBtnColor}>
            {getSubmitBtnText()}
          </Button>
          <Button variant="link" onClick={handleClose}>
            Atšaukti
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCardModal;
