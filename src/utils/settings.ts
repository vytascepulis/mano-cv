import { SettingsData } from "@/types/types";
import { SettingsState } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import { getUserPhoto } from "@/utils/user";

export const buildSettings = (settings: SettingsData): SettingsState => {
  if (!settings) return initialSettings;

  return {
    ...settings,
    image: {
      url: settings.image ? getUserPhoto(settings.image) : null,
      blob: null,
    },
  };
};

export const isSettingsValid = (settings: Partial<SettingsState>) => {
  return Boolean(
    (settings.image?.blob || settings.image?.url) &&
      settings.fullName?.trim() &&
      settings.phoneNumber?.trim() &&
      settings.address?.trim() &&
      settings.intro?.trim() &&
      settings.skills?.length &&
      settings.education?.length &&
      settings.websiteDesign &&
      settings.subdomainCode?.length === 4,
  );
};

export function buildFormData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  form = new FormData(),
  namespace = "",
): FormData {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (data[key] instanceof Blob) {
      form.append(formKey, data[key]);
    } else if (Array.isArray(data[key]) || typeof data[key] === "object") {
      form.append(formKey, JSON.stringify(data[key]));
    } else {
      form.append(formKey, data[key]);
    }
  }
  return form;
}
