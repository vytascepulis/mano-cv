import { getDomainUrl } from "@/utils/subdomain";

export const getGenericUserPhoto = () => {
  return `${getDomainUrl()}/generic-user.jpg`;
};

export const getUserImage = (userId: string) => {
  return (
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_USER_PHOTO_PATH}/${userId}/user-image.webp` ||
    getGenericUserPhoto()
  );
};
