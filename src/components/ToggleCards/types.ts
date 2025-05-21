import { WebsiteDesigns } from "@/types/enums";

export interface IToggleCard {
  slug: WebsiteDesigns;
  title: string;
  description: string;
}

export interface ToggleOptions {
  onSelect?: (card: IToggleCard) => void;
  onView?: (card: IToggleCard) => void;
}
