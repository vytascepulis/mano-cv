import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "@/constants/http";

export const handleCors = (req: NextApiRequest, res: NextApiResponse) => {
  const origin = req.headers.origin;
  const allowedDomainPattern =
    /^https:\/\/([a-z0-9-]+\.)?mano-cv\.lt$|^http:\/\/localhost(:\d+)?$/;

  if (origin && allowedDomainPattern.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }

  if (req.method === "OPTIONS") {
    res.status(200).end(); // End preflight request
    return true; // Indicate that the request has been handled
  }

  return false; // Request should continue to API logic
};

export const buildErrorResponse = (res: NextApiResponse, code: HttpError) => {
  res.status(code).json({ message: HttpError[code] });
};
