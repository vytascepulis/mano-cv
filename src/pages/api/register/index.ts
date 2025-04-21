import type { NextApiRequest, NextApiResponse } from "next";
import { registerSlugMutation } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ErrorResponse, RegisterData } from "@/types/types";
import { HttpError } from "@/constants/http";
import { buildErrorResponse } from "@/pages/api/utils";

type Response = RegisterData | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const slug = req.body.slug;

  if (method === "POST") {
    if (!slug) {
      return buildErrorResponse(res, HttpError.BAD_REQUEST);
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return buildErrorResponse(res, HttpError.NOT_LOGGED_IN);
    }

    const { data, error } = await registerSlugMutation({
      slug,
      userId: session.user.id,
    });

    if (error) {
      return buildErrorResponse(res, HttpError.INTERNAL_ERROR);
    }

    return res.status(200).json(data);
  }

  return buildErrorResponse(res, HttpError.METHOD_NOT_ALLOWED);
}
