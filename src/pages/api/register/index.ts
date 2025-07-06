import { RegisterData } from "@/types/types";
import { HttpError } from "@/constants/http";
import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { ErrorResponse, HandlerWithJwt } from "@/pages/api/types";
import { isMaxRequests, withJwtCheck } from "@/lib/checks";
import { createSubdomain } from "@/lib/handlers";

type Response = RegisterData | ErrorResponse;

const handler: HandlerWithJwt<Response> = async (req, res, jwt) => {
  const method = req.method;
  const slug = req.body.slug?.trim();

  if (method === "POST") {
    const maxRequests = await isMaxRequests({ req, maxCount: 10 });

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

    const { userId: id } = jwt;

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

export default withJwtCheck(handler);
