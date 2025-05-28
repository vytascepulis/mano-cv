import { Card, CardOptions, ModalState } from "@/components/InfoCards/types";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import InputDate from "@/components/ui/InputDate";
import { useEffect, useState } from "react";
import Checkbox from "@/components/ui/Checkbox";
import { formatDate } from "@/utils/date";

interface Props {
  state: ModalState | null;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (card: Card) => void;
  options: CardOptions;
  name: string;
}

const EditCardModal = ({
  state,
  isOpen,
  onSubmit,
  handleClose,
  options,
  name,
}: Props) => {
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);
  const [title, setTitle] = useState(state?.selectedCard?.title || "");
  const [subtitle, setSubtitle] = useState(state?.selectedCard?.subtitle || "");
  const [description, setDescription] = useState(
    state?.selectedCard?.description || "",
  );

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
    setIsCurrent(state?.selectedCard?.dateTo === null);
    setTitle(state?.selectedCard?.title || "");
    setSubtitle(state?.selectedCard?.subtitle || "");
    setDescription(state?.selectedCard?.description || "");
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
    <Modal isOpen={isOpen} handleClose={handleClose} className="max-w-[600px]">
      <div className="p-2">
        <h1 className="mb-5 pr-5 text-2xl">{getModalTitle()}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            label={options.titleLabel}
            placeholder={options.titlePlaceholder}
            required
            defaultValue={title}
            onChange={setTitle}
            name="title"
            disabled={state?.mode === "delete"}
          />
          <Input
            type="text"
            label={options.subtitleLabel}
            placeholder={options.subtitlePlaceholder}
            required
            defaultValue={subtitle}
            onChange={setSubtitle}
            name="subtitle"
            disabled={state?.mode === "delete"}
          />
          {options.descriptionLabel && options.descriptionPlaceholder && (
            <Input
              type="textarea"
              label={options.descriptionLabel}
              placeholder={options.descriptionPlaceholder}
              required
              defaultValue={description}
              onChange={setDescription}
              name="description"
              disabled={state?.mode === "delete"}
            />
          )}
          <div className="flex flex-col items-start gap-2 sm:w-[400px] sm:flex-row sm:items-end sm:gap-5">
            <div>
              <InputDate
                selectedDate={dateFrom ? new Date(dateFrom) : null}
                onChange={(val) => setDateFrom(formatDate(val))}
                required
                label={options.dateFromLabel}
                placeholder="MMMM-mm"
                disabled={state?.mode === "delete"}
                variant="link"
              />
            </div>
            <div>
              <InputDate
                selectedDate={dateTo ? new Date(dateTo) : null}
                onChange={(val) => setDateTo(formatDate(val))}
                required
                label={options.dateToLabel}
                placeholder="MMMM-mm"
                disabled={isCurrent || state?.mode === "delete"}
                variant="link"
              />
            </div>
            {state?.mode !== "delete" && (
              <Checkbox
                label={options.dateNowLabel}
                name={`${name}-current-checkbox`}
                checked={isCurrent}
                onChange={handleCheckboxChange}
              />
            )}
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
      </div>
    </Modal>
  );
};

export default EditCardModal;
