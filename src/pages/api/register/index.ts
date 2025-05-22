import { RegisterData } from "@/types/types";
import { HttpError } from "@/constants/http";
import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { ErrorResponse, HandlerWithSession } from "@/pages/api/types";
import { isMaxRequests, withSessionCheck } from "@/lib/checks";
import { createSubdomain } from "@/lib/handlers";

type Response = RegisterData | ErrorResponse;

const handler: HandlerWithSession<Response> = async (req, res, session) => {
  const method = req.method;
  const slug = req.body.slug;

  if (method === "POST") {
    const maxRequests = await isMaxRequests({ req, maxCount: 20 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    if (!slug) {
      return returnErrorResponse(
        req,
        res,
        buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: "No slug provided while registering subdomain",
        }),
      );
    }

    const { userId: id } = session.user;

    const { data, error } = await createSubdomain({
      slug,
      userId: id,
    });

    if (error || !data) {
      return returnErrorResponse(req, res, error);
    }

    return res.status(200).json(data);
  }

  return returnErrorResponse(
    req,
    res,
    buildErrorResponse({
      code: HttpError.METHOD_NOT_ALLOWED,
      serverMessage: "Method not allowed",
    }),
  );
};

export default withSessionCheck(handler);
