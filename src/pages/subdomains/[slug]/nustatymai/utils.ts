import { SettingsData } from "@/types/types";
import { SettingsState } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import { getUserImage } from "@/utils/user";
import { WebsiteDesigns } from "@/types/supabase.enums";

export const buildSettings = (data: SettingsData): SettingsState => {
  const { settings, education, experience, userId } = data;

  if (!settings) return initialSettings;

  return {
    image: {
      url: getUserImage(userId),
      blob: null,
    },
    ...settings,
    websiteDesign: settings.websiteDesign as WebsiteDesigns,
    education: education.map((item) => ({
      ...item,
      dateFrom: new Date(item.dateFrom),
      dateTo: item.dateTo ? new Date(item.dateTo) : null,
    })),
    experience: experience.map((item) => ({
      ...item,
      dateFrom: new Date(item.dateFrom),
      dateTo: item.dateTo ? new Date(item.dateTo) : null,
    })),
  };
};
