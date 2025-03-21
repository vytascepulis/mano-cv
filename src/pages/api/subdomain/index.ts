import type { NextApiRequest, NextApiResponse } from "next";
import data from "./subdomains.json";
import { formatSubdomain } from "@/utils/subdomain";
import { SubdomainData } from "@/types/subdomain";

interface ResponseError {
  message: string;
}

type Response = SubdomainData | ResponseError;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const subdomain = req.body.subdomain;
  const code = req.body.code;

  if (method === "OPTIONS") {
    res.status(200).end();
    return;
  }

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

    res.status(200).json({ ...formatSubdomain(foundSubdomain) });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
