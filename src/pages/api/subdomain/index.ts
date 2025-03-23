import type { NextApiRequest, NextApiResponse } from "next";
import data from "./subdomains.json";
import { formatSubdomain, getSubdomainFromUrl } from "@/utils/subdomain";
import { SubdomainData } from "@/types/subdomain";
import { handleCors } from "@/utils/cors";

interface ResponseError {
  message: string;
}

type Response = SubdomainData | ResponseError;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (handleCors(req, res)) return;

  const method = req.method;
  const subdomain = getSubdomainFromUrl(req.headers.origin);
  const code = req.body.code || req.cookies.code;

  console.log("code: ", code);

  if (method === "POST") {
    const foundSubdomain = data.subdomains.find(
      (item) => item.slug === subdomain,
    );

    if (!foundSubdomain) {
      res.status(404).json({ message: "Subdomain not found" });
      return;
    }

    if (!code || code !== foundSubdomain.code) {
      res.status(400).json({ message: "Incorrect code" });
      return;
    }

    const maxAge = 48 * 60 * 60;
    const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    res.setHeader(
      "Set-Cookie",
      `code=${foundSubdomain.code}; Domain=${domain}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`,
    );

    res.status(200).json({ ...formatSubdomain(foundSubdomain) });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
