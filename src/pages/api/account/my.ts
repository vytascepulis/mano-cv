import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { ErrorResponse, HandlerWithJwt } from "@/pages/api/types";
import { isMaxRequests, withJwtCheck, withSubdomainCheck } from "@/lib/checks";
import { deleteUserAccount } from "@/lib/handlers";

type Response = string | ErrorResponse;

const handler: HandlerWithJwt<Response> = async (req, res, jwt) => {
  const method = req.method;

  if (method === "DELETE") {
    const maxRequests = await isMaxRequests({ req, maxCount: 3 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { googleId, userId: id } = jwt;
    const { data, error } = await deleteUserAccount({
      id,
      googleId,
    });

    if (error) {
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

export default withSubdomainCheck(withJwtCheck(handler));
