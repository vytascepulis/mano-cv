import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "@/constants/http";
import { SubdomainStatus, UserStatus, WebsiteDesigns } from "@/types/enums";
import { Card } from "@/components/InfoCards/types";
import { DrivingLicence, LanguageEntry, SettingsData } from "@/types/types";
import { JWT } from "next-auth/jwt";

export type FirestoreResponse<T> = Promise<
  { data: T; error: null } | { data: null; error: ErrorResponse }
>;

export interface ErrorResponse {
  code: HttpError;
  serverMessage?: string;
  clientMessage?: string;
}

export type HandlerWithJwt<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  jwt: JWT,
) => unknown | Promise<unknown>;

export type HandlerWithOptionalJwt<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  jwt: JWT | null,
) => unknown | Promise<unknown>;

export type ParsedSettingsData = Omit<
  SettingsData,
  "subdomainStatus" | "userStatus" | "image"
>;

export interface IUser {
  email: string;
  googleId: string;
  status: UserStatus;
}

export interface ISubdomain {
  slug: string;
  status: SubdomainStatus;
}

export interface ISettings {
  address: string | null;
  desiredPositions: string[];
  expectedSalary: string | null;
  intro: string | null;
  image: string | null;
  email: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  websiteDesign: WebsiteDesigns | null;
  experience: Card[];
  education: Card[];
  skills: string[];
  languages: LanguageEntry[];
  drivingLicences: DrivingLicence[];
  subdomainCode: string | null;
}

export interface GetUserByGoogleIdResponse {
  id: string;
  status: UserStatus;
  subdomainSlug?: ISubdomain["slug"];
  image?: ISettings["image"];
}

export interface CreateUserResponse {
  id: string;
  status: IUser["status"];
}

export interface UpdateSubdomainStatusResponse {
  status: SubdomainStatus;
}
