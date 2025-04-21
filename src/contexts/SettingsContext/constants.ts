import { getGenericUserPhoto } from "@/utils/user";
import { WebsiteDesigns } from "@/types/supabase.enums";

export const initialSettings = {
  image: {
    url: getGenericUserPhoto(),
    blob: null,
  },
  imageBlob: null,
  fullName: "",
  phoneNumber: "",
  email: "",
  address: "",
  intro: "",
  skills: [],
  languages: [],
  experience: [],
  education: [],
  desiredPosition: [],
  expectedSalary: "",
  websiteDesign: WebsiteDesigns.CLASSIC,
};
