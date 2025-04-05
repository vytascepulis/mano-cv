import type { NextApiRequest, NextApiResponse } from "next";
import { formatSubdomain, getSubdomainFromUrl } from "@/utils/subdomain";
import { SubdomainData } from "@/types/subdomain";
import { handleCors } from "@/utils/cors";
import { sha256 } from "@/utils/crypto";
import { supabase } from "@/lib/supabase";

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
  const subdomain = getSubdomainFromUrl(req.headers.origin!);
  const cookiesCode = req.cookies.code;
  const bodyCode = sha256(req.body.code);

  if (method === "POST") {
    const { data, error } = await supabase
      .from("subdomains")
      .select()
      .limit(1)
      .eq("slug", subdomain);

    if (error || !data) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const subdomainData = data[0];

    if (!subdomainData) {
      res.status(404).json({ message: "Subdomain not found" });
      return;
    }

    if (bodyCode === subdomainData.code || cookiesCode === subdomainData.code) {
      if (bodyCode && !cookiesCode) {
        const maxAge = 48 * 60 * 60;
        const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

        res.setHeader(
          "Set-Cookie",
          `code=${subdomainData.code}; Domain=${domain}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`,
        );
      }
      res.status(200).json({ ...formatSubdomain(subdomainData) });
      return;
    }

    res.status(400).json({ message: "Incorrect code" });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
