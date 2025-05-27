import { SettingsData } from "@/types/types";
import { SettingsState } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import { getUserPhoto } from "@/utils/user";
import { settingsData } from "@/staticData/settings";

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

export const validateSettingsState = (settings: Partial<SettingsState>) => {
  const errorFields = [];

  if (!settings.image?.blob && !settings.image?.url) {
    errorFields.push("image");
  }

  if (!settings.fullName?.trim()) {
    errorFields.push("fullName");
  }

  if (!settings.phoneNumber?.trim()) {
    errorFields.push("phoneNumber");
  }

  if (!settings.address?.trim()) {
    errorFields.push("address");
  }

  if (!settings.intro?.trim()) {
    errorFields.push("intro");
  }

  if (!settings.skills?.length) {
    errorFields.push("skills");
  }

  if (!settings.education?.length) {
    errorFields.push("education");
  }

  if (!settings.websiteDesign) {
    errorFields.push("websiteDesign");
  }

  if (settings.subdomainCode?.length !== 4) {
    errorFields.push("subdomainCode");
  }

  const errorMessage =
    errorFields.length > 0
      ? `Užpildyk būtinus CV laukelius: \n${parseErrorFields(errorFields).join("\n")}`
      : null;

  return { isValid: Boolean(!errorFields.length), errorFields, errorMessage };
};

export const parseErrorFields = (errorFields: string[]) => {
  const { settingsList: texts } = settingsData;
  return errorFields.map((field) => {
    return texts[field].title;
  });
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
