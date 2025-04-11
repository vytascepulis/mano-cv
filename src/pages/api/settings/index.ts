import type { NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { subdomainSettingsQuery } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ErrorResponse, UserData } from "@/types/types";
import { buildErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";

type Response = UserData | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const subdomain = getSubdomainFromUrl(req.headers.origin);

  if (method === "POST") {
    if (!subdomain) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return buildErrorResponse(res, HttpError.NOT_LOGGED_IN);
    }

    const { data: settingsData, error } = await subdomainSettingsQuery({
      subdomain,
    });

    if (error) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    if (!settingsData) {
      return buildErrorResponse(res, HttpError.NOT_FOUND);
    }

    if (settingsData.googleId !== session.user.googleId) {
      return buildErrorResponse(res, HttpError.NOT_ALLOWED);
    }

    return res.status(200).json({ ...settingsData });
  }

  return buildErrorResponse(res, HttpError.METHOD_NOT_ALLOWED);
}
