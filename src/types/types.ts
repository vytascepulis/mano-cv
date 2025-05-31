import { Card } from "@/components/InfoCards/types";
import { ISettings, ISubdomain, IUser } from "@/pages/api/types";
import { SubdomainStatus, UserStatus, WebsiteDesigns } from "@/types/enums";

export interface SettingsData extends ISettings {
  userStatus: UserStatus;
  subdomainStatus: SubdomainStatus;
}

export const LanguageLevel = {
  BEGINNER: "Pagrindai",
  INTERMEDIATE: "Vidutinis",
  ADVANCED: "Pažengęs",
  NATIVE: "Gimtoji",
};

export interface LanguageEntry {
  id: string;
  language: string;
  level: keyof typeof LanguageLevel;
}

export interface DrivingLicence {
  id: string;
  issuedAt: string;
  category: string;
}

export interface RegisterData {
  id: string;
  googleId: IUser["googleId"];
  slug: ISubdomain["slug"];
  userStatus: UserStatus;
}

export interface SubdomainData {
  address: string;
  desiredPositions: string[];
  expectedSalary: string | null;
  intro: string;
  image: string | null;
  email: string | null;
  fullName: string;
  phoneNumber: string;
  websiteDesign: WebsiteDesigns;
  experience: Card[];
  education: Card[];
  skills: string[];
  languages: LanguageEntry[];
  drivingLicences: DrivingLicence[];
}
