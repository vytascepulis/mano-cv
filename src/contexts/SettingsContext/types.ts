import { Card } from "@/components/InfoCards/types";
import { WebsiteDesigns } from "@/types/supabase.enums";

export interface SettingsState {
  image: {
    blob: Blob | null;
    url: string;
  };
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  intro: string;
  skills: string[];
  languages: string[];
  experience: Card[];
  education: Card[];
  desiredPosition: string[];
  expectedSalary: string;
  websiteDesign: WebsiteDesigns;
}

export interface Context {
  isEditing: boolean;
  toggleIsEditing: () => void;
  handleSaveSettings: () => void;
  isWebsiteActive: boolean;
  handleSetIsWebsiteActive: (val: boolean) => void;
  handleOnChange: <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K],
  ) => void;
  handleOnDesignPreview: (slug: string) => void;
  settings: SettingsState;
}
