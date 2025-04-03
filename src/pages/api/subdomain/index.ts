import type { NextApiRequest, NextApiResponse } from "next";
import { formatSubdomain, getSubdomainFromUrl } from "@/utils/subdomain";
import { SubdomainData } from "@/types/subdomain";
import { handleCors } from "@/utils/cors";
import { createClient } from "@supabase/supabase-js";
import { sha256 } from "@/utils/crypto";

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
  const code = req.body.code;

  if (method === "POST") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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

    if (!code || sha256(code) !== subdomainData.code) {
      res.status(400).json({ message: "Incorrect code" });
      return;
    }

    res.status(200).json({ ...formatSubdomain(subdomainData) });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
