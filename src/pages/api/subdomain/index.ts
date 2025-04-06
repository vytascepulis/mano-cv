import type { NextApiRequest, NextApiResponse } from "next";
import { formatSubdomainData, getSubdomainFromUrl } from "@/utils/subdomain";
import { handleCors } from "@/utils/cors";
import { sha256 } from "@/utils/crypto";
import { userWithSubdomainQuery } from "@/lib/supabase";
import { SubdomainData } from "@/types/types";
import { SubdomainStatus } from "@/types/supabase.enums";

interface ResponseError {
  message: string;
}

type Response = SubdomainData | ResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (handleCors(req, res)) return;

  const method = req.method;
  const subdomain = getSubdomainFromUrl(req.headers.origin);
  const cookiesCode = req.cookies.code;
  const bodyCode = sha256(req.body.code);

  if (method === "POST" && subdomain) {
    const { data, error } = await userWithSubdomainQuery
      .eq("subdomain.slug", subdomain)
      .limit(1);

    if (error || !data) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const userData = data[0];

    if (
      !userData?.subdomain ||
      userData?.subdomain.status === SubdomainStatus.HIDDEN ||
      userData?.status === SubdomainStatus.BLOCKED
    ) {
      res.status(404).json({ message: "Subdomain not found" });
      return;
    }

    if (
      bodyCode === userData.subdomain.code ||
      cookiesCode === userData.subdomain.code
    ) {
      if (bodyCode && !cookiesCode) {
        const maxAge = 14 * 24 * 60 * 60; // 2 weeks

        res.setHeader(
          "Set-Cookie",
          `code=${userData.subdomain.code}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`,
        );
      }

      res.status(200).json({ ...formatSubdomainData(userData) });
      return;
    }

    res.status(400).json({ message: "Incorrect code" });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
