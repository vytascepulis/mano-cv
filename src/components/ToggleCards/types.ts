export interface IToggleCard {
  id: string;
  title: string;
  description: string;
}

export interface ToggleOptions {
  onSelect?: (card: IToggleCard) => void;
  onView?: (card: IToggleCard) => void;
}
