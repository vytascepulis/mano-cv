import { getSubdomainFromUrl } from "@/utils/subdomain";
import {
  buildErrorResponse,
  formatSubdomainData,
  returnErrorResponse,
} from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { ErrorResponse, HandlerWithOptionalJwt } from "@/pages/api/types";
import {
  isMaxRequests,
  withOptionalJwtCheck,
  withSubdomainCheck,
} from "@/lib/checks";
import { SubdomainData } from "@/types/types";
import { getSubdomainByCode } from "@/lib/handlers";

type Response = SubdomainData | ErrorResponse;

const handler: HandlerWithOptionalJwt<Response> = async (req, res, jwt) => {
  const method = req.method;
  const subdomainSlug = getSubdomainFromUrl(req.headers.host || "")!;
  const cookiesCode = req.cookies.code;
  const bodyCode = req.body.code;

  if (method === "POST") {
    const maxRequests = await isMaxRequests({ req, maxCount: 10 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { data, error } = await getSubdomainByCode({
      subdomainCode: bodyCode || cookiesCode,
      subdomainSlug,
      googleId: jwt?.googleId,
      userId: jwt?.userId,
    });

    if (error) {
      return returnErrorResponse(req, res, error);
    }

    return res.status(200).json(formatSubdomainData(data));
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

export default withSubdomainCheck(withOptionalJwtCheck(handler));
