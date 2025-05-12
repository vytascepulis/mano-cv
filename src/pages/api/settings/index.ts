import type { NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { userSettingsQuery } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ErrorResponse, SettingsData } from "@/types/types";
import { buildErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";

type Response = SettingsData | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const subdomain = getSubdomainFromUrl(req.headers.host);

  if (!subdomain) {
    return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
  }

  if (method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return buildErrorResponse(res, HttpError.NOT_LOGGED_IN);
    }

    const { googleId, id } = session.user;

    const { data, error } = await userSettingsQuery({
      id,
      googleId,
    });

    if (error) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    if (!data || !data.subdomain) {
      return buildErrorResponse(res, HttpError.NOT_FOUND);
    }

    return res.status(200).json({ ...data });
  }

  if (method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return buildErrorResponse(res, HttpError.NOT_LOGGED_IN);
    }

    const { googleId, id } = session.user;

    const { data, error } = await userSettingsQuery({
      id,
      googleId,
    });

    if (error) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    if (!data || !data.subdomain) {
      return buildErrorResponse(res, HttpError.NOT_FOUND);
    }

    return res.status(200).json({ ...data });
  }

  return buildErrorResponse(res, HttpError.METHOD_NOT_ALLOWED);
}
