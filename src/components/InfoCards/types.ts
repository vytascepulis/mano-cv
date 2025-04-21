import { ReactNode } from "react";

export interface Card {
  id: string;
  title: string;
  subtitle: string;
  description: string | null;
  dateFrom: Date;
  dateTo: Date | null;
  isCurrent: boolean;
}

export interface CardOptions {
  addNewBtnChildren: ReactNode;
  titleLabel: string;
  titlePlaceholder: string;
  subtitleLabel: string;
  subtitlePlaceholder: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
  dateFromLabel: string;
  dateToLabel: string;
  dateNowLabel: string;
  editModalTitle: string;
  deleteModalTitle: string;
}

export interface ModalState {
  selectedCard: Card | null;
  mode: "new" | "edit" | "delete";
}
