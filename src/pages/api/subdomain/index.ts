import type { NextApiRequest, NextApiResponse } from "next";
import { formatUserData, getSubdomainFromUrl } from "@/utils/subdomain";
import { handleCors } from "@/utils/cors";
import { sha256 } from "@/utils/crypto";
import { supabase } from "@/lib/supabase";
import { UserData } from "@/types/types";
import { SubdomainStatus } from "@/types/supabase.enums";

interface ResponseError {
  message: string;
}

type Response = UserData | ResponseError;

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
    const { data, error } = await supabase
      .from("users")
      .select("*, subdomain(*)")
      .eq("subdomain.slug", subdomain)
      .limit(1);

    if (error || !data) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    // console.log(subdomain);
    const userData = data[0];
    console.log("userData2", userData);
    // console.log("data: ", data);
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
        const maxAge = 48 * 60 * 60;

        res.setHeader(
          "Set-Cookie",
          `code=${userData.subdomain.code}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`,
        );
      }

      res.status(200).json({ ...formatUserData(userData) });
      return;
    }

    res.status(400).json({ message: "Incorrect code" });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
