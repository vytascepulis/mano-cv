import { getDomainUrl } from "@/utils/subdomain";
import { SettingsState } from "@/contexts/SettingsContext/types";

export const getGenericUserPhoto = () => {
  return `${getDomainUrl()}/generic-user.jpg`;
};

export const getUserImage = (userId: string) => {
  return (
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_USER_PHOTO_PATH}/${userId}/user-image.webp` ||
    getGenericUserPhoto()
  );
};

export const isSettingsValid = (settings: SettingsState) => {
  return (
    (settings.image.blob || settings.image.url) &&
    settings.fullName.trim() &&
    settings.email.trim() &&
    settings.phoneNumber.trim() &&
    settings.address.trim() &&
    settings.intro.trim() &&
    settings.skills.length > 0 &&
    settings.languages.length > 0 &&
    settings.experience.length > 0 &&
    settings.education.length > 0 &&
    settings.desiredPosition.length > 0 &&
    settings.expectedSalary.trim() &&
    settings.websiteDesign
  );
};
