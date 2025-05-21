import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { HttpError } from "@/constants/http";
import { buildErrorResponse, returnErrorResponse } from "@/pages/api/utils";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ErrorResponse, HandlerWithSession } from "@/pages/api/types";
import { db } from "@/lib/firebase";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;

export function withSubdomainCheck<T>(
  handler: HandlerWithSession<T>,
): HandlerWithSession<T> {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<T>,
    session: Session,
  ) => {
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

    return handler(req, res, session);
  };
}

export function withSessionCheck<T>(
  handler: HandlerWithSession<T>,
): NextApiHandler<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    // if (process.env.NODE_ENV === "development") {
    //   return handler(req, res, {
    //     user: {
    //       userId: "9ir2DjRj02j60cWGpwWW",
    //       googleId:
    //         "441e1b57d402ce537ae7af91e826ab742ab9af9953ca8ced5f85d43daf2556ef",
    //     },
    //   });
    // }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return returnErrorResponse(
        req,
        res,
        buildErrorResponse({
          code: HttpError.NOT_LOGGED_IN,
          serverMessage: "No session found",
        }),
      );
    }

    return handler(req, res, session);
  };
}

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
