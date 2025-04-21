import type { NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { sha256 } from "@/utils/crypto";
import { userSubdomainQuery } from "@/lib/supabase";
import { SubdomainData } from "@/types/types";
import { SubdomainStatus, UserStatus } from "@/types/supabase.enums";
import { ErrorCodes } from "@/constants/postgrest";
import { buildErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { formatSubdomainData } from "@/utils/apiResponseFormatters";

interface ResponseError {
  message: string;
}

type Response = SubdomainData | ResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const subdomain = getSubdomainFromUrl(req.headers.origin);
  const cookiesCode = req.cookies.code;
  const bodyCode = sha256(req.body.code);

  if (method === "POST") {
    if (!subdomain) {
      return buildErrorResponse(res, HttpError.BAD_REQUEST);
    }

    const { data, error } = await userSubdomainQuery({
      subdomain,
    });

    if (error) {
      if (error.code === ErrorCodes.NOT_FOUND) {
        return buildErrorResponse(res, HttpError.NOT_FOUND);
      }

      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    if (
      !data.subdomain ||
      data.subdomain.status === SubdomainStatus.HIDDEN ||
      data.userStatus === UserStatus.BLOCKED
    ) {
      return buildErrorResponse(res, HttpError.NOT_FOUND);
    }

    if (
      bodyCode === data.subdomain.code ||
      cookiesCode === data.subdomain.code
    ) {
      if (bodyCode && !cookiesCode) {
        const maxAge = 14 * 24 * 60 * 60; // 2 weeks

        res.setHeader(
          "Set-Cookie",
          `code=${data.subdomain.code}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`,
        );
      }

      return res.status(200).json(formatSubdomainData(data));
    }

    return buildErrorResponse(res, HttpError.NOT_ALLOWED);
  }

  return buildErrorResponse(res, HttpError.METHOD_NOT_ALLOWED);
}
