import { getSubdomainFromUrl } from "@/utils/subdomain";
import {
  buildErrorResponse,
  formatSubdomainData,
  returnErrorResponse,
} from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import { ErrorResponse, HandlerWithJwt } from "@/pages/api/types";
import { isMaxRequests, withSubdomainCheck } from "@/lib/checks";
import { SubdomainData } from "@/types/types";
import { getSubdomainByCode } from "@/lib/handlers";

type Response = SubdomainData | ErrorResponse;

const handler: HandlerWithJwt<Response> = async (req, res) => {
  const method = req.method;
  const subdomainSlug = getSubdomainFromUrl(req.headers.host || "")!;
  const cookiesCode = req.cookies.code;
  const bodyCode = req.body.code;

  console.log("cookiesCode: ", cookiesCode);

  if (method === "POST") {
    console.time("subdomain");
    const maxRequests = await isMaxRequests({ req, maxCount: 30 });

    if (maxRequests) {
      return returnErrorResponse(req, res, maxRequests);
    }

    console.time("getSubdomainByCode");
    const { data, error } = await getSubdomainByCode({
      subdomainCode: bodyCode || cookiesCode,
      subdomainSlug,
    });
    console.timeEnd("getSubdomainByCode");

    if (error) {
      return returnErrorResponse(req, res, error);
    }

    console.timeEnd("subdomain");
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
