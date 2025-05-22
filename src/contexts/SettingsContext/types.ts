import { Card } from "@/components/InfoCards/types";
import { SubdomainStatus, UserStatus, WebsiteDesigns } from "@/types/enums";

export interface SettingsState {
  image: {
    blob: Blob | null;
    url: string | null;
  };
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  intro: string | null;
  skills: string[];
  languages: string[];
  experience: Card[];
  education: Card[];
  desiredPositions: string[];
  expectedSalary: string | null;
  websiteDesign: WebsiteDesigns | null;
  subdomainStatus: SubdomainStatus | null;
  subdomainCode: string | null;
  userStatus: UserStatus | null;
}

export interface Context {
  isSubdomainToggleDisabled: boolean;
  isEditing: boolean;
  isSaveLoading: boolean;
  isSubdomainStatusLoading: boolean;
  toggleIsEditing: () => void;
  handleSaveSettings: () => void;
  handleOnChange: <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K],
  ) => void;
  handleOnDesignPreview: (slug: string) => void;
  handleSetActive: (val: boolean) => void;
  settings: SettingsState;
  render: number;
}
