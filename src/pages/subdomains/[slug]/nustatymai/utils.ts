import { SettingsData } from "@/types/types";
import { SettingsState } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import {
  SubdomainStatus,
  UserStatus,
  WebsiteDesigns,
} from "@/types/supabase.enums";

export const buildSettings = (data: SettingsData): SettingsState => {
  const { settings, education, experience, subdomain, userStatus } = data;

  if (!settings) return initialSettings;

  return {
    ...settings,
    image: {
      url: settings.image,
      blob: null,
    },
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
    subdomainStatus: subdomain.status as SubdomainStatus,
    userStatus: userStatus as UserStatus,
  };
};
