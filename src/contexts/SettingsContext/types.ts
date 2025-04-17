import { Card } from "@/components/InfoCards/types";

export interface SettingsState {
  image: File | null;
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
  expectedSalary: { amount: number; currency: string };
  websiteDesign: string;
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
  settings: SettingsState;
}
