import { SettingsData } from "@/types/types";
import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { isMaxRequests, withJwtCheck, withSubdomainCheck } from "@/lib/checks";
import { ErrorResponse, HandlerWithJwt } from "@/pages/api/types";
import { getUserSettings, updateUserSettings } from "@/lib/handlers";
import { HttpError } from "@/constants/http";
import { getSubdomainFromUrl } from "@/utils/subdomain";

type Response = SettingsData | ErrorResponse;

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: HandlerWithJwt<Response> = async (req, res, jwt) => {
  const method = req.method;

  const subdomainSlug = getSubdomainFromUrl(req.headers.host || "")!;

  if (method === "GET") {
    const maxRequests = await isMaxRequests({ req, maxCount: 30 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { googleId, userId: id } = jwt;

    const { data, error } = await getUserSettings({
      id,
      googleId,
      subdomainSlug,
    });

    if (error || !data) {
      return returnErrorResponse(req, res, error);
    }

    return res.status(200).json(data);
  }

  if (method === "PUT") {
    const maxRequests = await isMaxRequests({ req, maxCount: 15 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { googleId, userId: id } = jwt;

    const { data, error } = await updateUserSettings({
      id,
      googleId,
      req,
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

export default withSubdomainCheck(withJwtCheck(handler));
