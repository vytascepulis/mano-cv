import { Card } from "@/components/InfoCards/types";
import {
  SubdomainStatus,
  UserStatus,
  WebsiteDesigns,
} from "@/types/supabase.enums";

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
  subdomainStatus: SubdomainStatus;
  userStatus: UserStatus;
}

export interface Context {
  isSubdomainToggleDisabled: boolean;
  isEditing: boolean;
  toggleIsEditing: () => void;
  handleSaveSettings: () => void;
  handleOnChange: <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K],
  ) => void;
  handleOnDesignPreview: (slug: string) => void;
  handleSetActive: (val: boolean) => void;
  settings: SettingsState;
}
