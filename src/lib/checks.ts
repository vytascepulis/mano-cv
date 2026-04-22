import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { HttpError } from "@/constants/http";
import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import {
  ErrorResponse,
  HandlerWithJwt,
  HandlerWithOptionalJwt,
} from "@/pages/api/types";
import { db } from "@/lib/firebase";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;
import { createRateLimiter } from "@/lib/cache";
import { getToken, JWT } from "next-auth/jwt";

export function withSubdomainCheck<T>(
  handler: HandlerWithJwt<T>,
): HandlerWithJwt<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>, jwt: JWT) => {
    const subdomain = getSubdomainFromUrl(req.headers.host || "");

    if (!subdomain) {
      return returnErrorResponse(
        req,
        res,
        buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: "Subdomain not found",
        }),
      );
    }

    return handler(req, res, jwt);
  };
}

export function withJwtCheck<T>(handler: HandlerWithJwt<T>): NextApiHandler<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return returnErrorResponse(
        req,
        res,
        buildErrorResponse({
          code: HttpError.NOT_LOGGED_IN,
          serverMessage: "No session found",
        }),
      );
    }

    return handler(req, res, token);
  };
}

export function withOptionalJwtCheck<T>(
  handler: HandlerWithOptionalJwt<T>,
): NextApiHandler<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    return handler(req, res, token);
  };
}

export const isMaxRequests = async ({
  req,
  maxCount,
}: {
  req: NextApiRequest;
  maxCount: number;
}): Promise<ErrorResponse | null> => {
  // Disable redis
  return null;

  if (process.env.NODE_ENV === "development") {
    return null;
  }

  if (process.env.ENDPOINTS_DISABLED === "true") {
    return buildErrorResponse({
      code: HttpError.TOO_MANY_REQUESTS,
      clientMessage: "Per daug užklausų. Šiek tiek palauk",
    });
  }

  const rateLimit = createRateLimiter(maxCount);

  const ip =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
  const method = req.method || "UNKNOWN";
  const endpoint = req.url || "UNKNOWN";

  const key = `${ip}:${method}:${endpoint}`;

  const { success } = await rateLimit.limit(key);

  if (!success) {
    return buildErrorResponse({
      code: HttpError.TOO_MANY_REQUESTS,
      serverMessage: `Too many requests from ip ${ip} for endpoint ${method}:${endpoint}`,
      clientMessage: "Per daug užklausų. Šiek tiek palauk",
    });
  }

  return null;
};

export const checkGoogleId = async ({
  id,
  googleId,
}: {
  id: string;
  googleId: string;
}): Promise<{
  userRef: DocumentReference | null;
  error: ErrorResponse | null;
}> => {
  const userRef = db.collection("users").doc(id);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    return {
      userRef: null,
      error: buildErrorResponse({
        code: HttpError.NOT_FOUND,
        serverMessage: `User id ${id} does not exist`,
        clientMessage: "Vartotojas nerastas",
      }),
    };
  }

  if (userSnap.data()?.googleId !== googleId) {
    return {
      userRef: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Provided googleId ${googleId} is not correct for user id ${id}`,
      }),
    };
  }

  return { userRef, error: null };
};
