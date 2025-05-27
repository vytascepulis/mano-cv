import { SubdomainStatus, UserStatus } from "@/types/enums";

export const initialSettings = {
  image: {
    url: null,
    blob: null,
  },
  imageBlob: null,
  fullName: null,
  phoneNumber: null,
  email: null,
  address: null,
  intro: null,
  skills: [],
  languages: [],
  experience: [],
  education: [],
  desiredPositions: [],
  expectedSalary: null,
  websiteDesign: null,
  drivingLicences: [],
  subdomainStatus: SubdomainStatus.ACTIVE,
  subdomainCode: null,
  userStatus: UserStatus.ACTIVE,
};
