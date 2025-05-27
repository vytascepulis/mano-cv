import genericUserImage from "@/staticData/generic-user.jpg";

export const getGenericUserPhoto = () => {
  return genericUserImage.src;
};

export const getUserPhoto = (imageKey: string) => {
  return `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_NAME}/${imageKey}`;
};
