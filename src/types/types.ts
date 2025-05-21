import { Card } from "@/components/InfoCards/types";
import { ISubdomain } from "@/pages/api/types";
import { SubdomainStatus, UserStatus, WebsiteDesigns } from "@/types/enums";

export interface SettingsData {
  address: string | null;
  desiredPositions: string[];
  expectedSalary: string | null;
  intro: string | null;
  image: string | null;
  email: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  websiteDesign: string | null;
  subdomainCode: string | null;
  experience: Card[];
  education: Card[];
  skills: string[];
  languages: string[];
  userStatus: UserStatus;
  subdomainStatus: SubdomainStatus;
}

export interface RegisterData {
  id: string;
  slug: ISubdomain["slug"];
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
  languages: string[];
}
