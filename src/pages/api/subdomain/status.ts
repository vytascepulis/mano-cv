import type { NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { subdomainStatusMutation, userSettingsQuery } from "@/lib/supabase";
import { SubdomainStatusMutationResponse } from "@/types/types";
import { SubdomainStatus, UserStatus } from "@/types/supabase.enums";
import { buildErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isSettingsValid } from "@/utils/user";
import { buildSettings } from "@/pages/subdomains/[slug]/nustatymai/utils";

interface ResponseError {
  message: string;
}

type Response = SubdomainStatusMutationResponse | ResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const subdomain = getSubdomainFromUrl(req.headers.origin);
  const newStatus = req.body.status;

  if (method === "POST") {
    if (!subdomain || !newStatus) {
      return buildErrorResponse(res, HttpError.BAD_REQUEST);
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return buildErrorResponse(res, HttpError.NOT_LOGGED_IN);
    }

    const { googleId, id } = session.user;

    const { data: settingsData, error: settingsError } =
      await userSettingsQuery({
        id,
        googleId,
      });

    if (settingsError || !settingsData || !settingsData.settings) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    if (
      newStatus === SubdomainStatus.ACTIVE &&
      !isSettingsValid(buildSettings(settingsData))
    ) {
      return buildErrorResponse(res, HttpError.NOT_ALLOWED);
    }

    if (settingsData.userStatus === UserStatus.BLOCKED) {
      return buildErrorResponse(res, HttpError.NOT_ALLOWED);
    }

    const { data: mutationData, error: mutationError } =
      await subdomainStatusMutation({
        id,
        status: newStatus,
      });

    if (mutationError || !mutationData) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    return res.status(200).json({ status: mutationData.status });
  }

  return buildErrorResponse(res, HttpError.METHOD_NOT_ALLOWED);
}
