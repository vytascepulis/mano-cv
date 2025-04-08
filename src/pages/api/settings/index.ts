import type { NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { handleCors } from "@/utils/cors";
import { subdomainSettingsQuery } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserData } from "@/types/types";

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

  if (method === "POST" && subdomain) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const { data: settingsData, error } = await subdomainSettingsQuery({
      subdomain,
    });

    if (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (!settingsData) {
      res.status(404).json({ message: "Subdomain not found" });
      return;
    }

    if (settingsData.googleId !== session.user.googleId) {
      res.status(401).json({ message: "Subdomain does not belong to you" });
      return;
    }

    res.status(200).json({ ...settingsData });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
