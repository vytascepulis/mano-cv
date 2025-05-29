import { getSubdomainFromUrl } from "@/utils/subdomain";
import {
  buildErrorResponse,
  formatSubdomainData,
  returnErrorResponse,
} from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { ErrorResponse, HandlerWithSession } from "@/pages/api/types";
import { isMaxRequests, withSubdomainCheck } from "@/lib/checks";
import { SubdomainData } from "@/types/types";
import { getSubdomainByCode } from "@/lib/handlers";

type Response = SubdomainData | ErrorResponse;

const handler: HandlerWithSession<Response> = async (req, res) => {
  const method = req.method;
  const subdomainSlug = getSubdomainFromUrl(req.headers.host || "")!;
  const cookiesCode = req.cookies.code;
  const bodyCode = req.body.code;

  if (method === "POST") {
    const maxRequests = await isMaxRequests({ req, maxCount: 200 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    const { data, error } = await getSubdomainByCode({
      subdomainCode: bodyCode || cookiesCode,
      subdomainSlug,
    });

    if (error) {
      return returnErrorResponse(req, res, error);
    }

    if (bodyCode && !cookiesCode) {
      const maxAge = 14 * 24 * 60 * 60; // 2 weeks

      res.setHeader(
        "Set-Cookie",
        `code=${bodyCode}; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`,
      );
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

export default withSubdomainCheck(handler);
