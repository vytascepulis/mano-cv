import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "@/constants/http";
import { ErrorResponse, ParsedSettingsData } from "@/pages/api/types";
import formidable from "formidable";
import { WebsiteDesigns } from "@/types/enums";
import { Card } from "@/components/InfoCards/types";
import {
  DrivingLicence,
  LanguageEntry,
  SettingsData,
  SubdomainData,
} from "@/types/types";

export const buildErrorResponse = ({
  code,
  serverMessage,
  clientMessage,
}: ErrorResponse) => {
  return { serverMessage, clientMessage, code };
};

export const returnErrorResponse = (
  req: NextApiRequest,
  res: NextApiResponse,
  error: ErrorResponse,
) => {
  if (error.serverMessage) {
    console.log("[ERROR]", error.serverMessage);
  }

  // if (
  //   process.env.NODE_ENV !== "development" &&
  //   process.env.ENDPOINTS_DISABLED === "false" &&
  //   error.serverMessage
  // ) {
  //   console.log(
  //     "SERVER: " + error.serverMessage || error.clientMessage || "Server error",
  //   );
  // }

  res.status(error.code).json({
    code: HttpError[error.code],
    message: error.clientMessage || "Nenumatyta klaida",
  });
};

type ParseFormResult = {
  fields: formidable.Fields | null;
  files: formidable.Files | null;
  error: ErrorResponse | null;
};

export const parseForm = async (
  req: NextApiRequest,
): Promise<ParseFormResult> => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  return new Promise((resolve) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        resolve({
          fields: null,
          files: null,
          error: { code: HttpError.BAD_REQUEST, serverMessage: err },
        });
      } else {
        resolve({ fields, files, error: null });
      }
    });
  });
};

export function validateSettingsData(fields: formidable.Fields): {
  error: ErrorResponse | null;
  settings: ParsedSettingsData | null;
} {
  const parseJson = <T>(value: string | undefined): T | null => {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  };

  const settings = {
    address: fields?.address?.[0] ?? "",
    fullName: fields?.fullName?.[0] ?? "",
    email: fields?.email?.[0] ?? null,
    phoneNumber: fields?.phoneNumber?.[0] ?? "",
    intro: fields?.intro?.[0] ?? "",
    websiteDesign: (fields?.websiteDesign?.[0] as WebsiteDesigns) ?? null,
    subdomainCode: fields?.subdomainCode?.[0] ?? null,
    desiredPositions: parseJson<string[]>(fields?.desiredPositions?.[0]) ?? [],
    education: parseJson<Card[]>(fields?.education?.[0]) ?? [],
    experience: parseJson<Card[]>(fields?.experience?.[0]) ?? [],
    skills: parseJson<string[]>(fields?.skills?.[0]) ?? [],
    languages: parseJson<LanguageEntry[]>(fields?.languages?.[0]) ?? [],
    expectedSalary: fields?.expectedSalary?.[0] ?? null,
    drivingLicences:
      parseJson<DrivingLicence[]>(fields?.drivingLicences?.[0]) ?? [],
  };

  const isValid = Boolean(
    settings.fullName?.trim() &&
      settings.phoneNumber?.trim() &&
      settings.address?.trim() &&
      settings.intro?.trim() &&
      settings.skills?.length &&
      settings.education?.length &&
      settings.websiteDesign &&
      settings.subdomainCode?.length === 4,
  );

  if (isValid) {
    return { error: null, settings };
  }

  return {
    error: buildErrorResponse({
      code: HttpError.BAD_REQUEST,
      serverMessage: "Passed settings not valid",
      clientMessage: "Užpildyk būtinus CV laukelius",
    }),
    settings: null,
  };
}

export function formatSettingsData(data: SettingsData): SettingsData {
  return {
    address: data.address,
    desiredPositions: data.desiredPositions,
    expectedSalary: data.expectedSalary,
    intro: data.intro,
    image: data.image,
    email: data.email,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    websiteDesign: data.websiteDesign,
    subdomainCode: data.subdomainCode,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    languages: data.languages,
    userStatus: data.userStatus,
    subdomainStatus: data.subdomainStatus,
    drivingLicences: data.drivingLicences,
  };
}

export function formatSubdomainData(data: SubdomainData): SubdomainData {
  return {
    address: data.address,
    desiredPositions: data.desiredPositions,
    expectedSalary: data.expectedSalary,
    intro: data.intro,
    image: data.image,
    email: data.email,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    websiteDesign: data.websiteDesign,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    languages: data.languages,
    drivingLicences: data.drivingLicences,
  };
}
