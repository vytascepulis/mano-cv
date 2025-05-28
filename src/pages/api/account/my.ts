import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { ErrorResponse, HandlerWithSession } from "@/pages/api/types";
import {
  isMaxRequests,
  withSessionCheck,
  withSubdomainCheck,
} from "@/lib/checks";
import { deleteUserAccount } from "@/lib/handlers";

type Response = string | ErrorResponse;

const handler: HandlerWithSession<Response> = async (req, res, session) => {
  const method = req.method;

  if (method === "DELETE") {
    const maxRequests = await isMaxRequests({ req, maxCount: 5 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { googleId, userId: id } = session.user;
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

export default withSubdomainCheck(withSessionCheck(handler));
