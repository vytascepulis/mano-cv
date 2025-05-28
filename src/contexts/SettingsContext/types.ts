import { SettingsData } from "@/types/types";

export interface SettingsState extends Omit<SettingsData, "image"> {
  image: {
    blob: Blob | null;
    url: string | null;
  };
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
}
