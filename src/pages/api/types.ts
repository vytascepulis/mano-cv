import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "@/constants/http";
import { SubdomainStatus, UserStatus, WebsiteDesigns } from "@/types/enums";
import { Card } from "@/components/InfoCards/types";
import { SettingsData } from "@/types/types";

export type FirestoreResponse<T> = Promise<
  { data: T; error: null } | { data: null; error: ErrorResponse }
>;

export interface ErrorResponse {
  code: HttpError;
  serverMessage?: string;
  clientMessage?: string;
}

export type HandlerWithSession<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  session: Session,
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
  subdomainCode: string;
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
