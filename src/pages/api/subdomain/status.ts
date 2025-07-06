import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import {
  ErrorResponse,
  HandlerWithJwt,
  UpdateSubdomainStatusResponse,
} from "@/pages/api/types";
import { isMaxRequests, withJwtCheck, withSubdomainCheck } from "@/lib/checks";
import { updateSubdomainStatus } from "@/lib/handlers";

type Response = UpdateSubdomainStatusResponse | ErrorResponse;

const handler: HandlerWithJwt<Response> = async (req, res, jwt) => {
  const method = req.method;
  const status = req.body.status;

  if (method === "PUT") {
    const maxRequests = await isMaxRequests({ req, maxCount: 15 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { googleId, userId: id } = jwt;

    const { data, error } = await updateSubdomainStatus({
      id,
      googleId,
      status,
    });

    if (error || !data) {
      return returnErrorResponse(req, res, error);
    }

    return res.status(200).json({ status: data });
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

export default withSubdomainCheck(withJwtCheck(handler));
