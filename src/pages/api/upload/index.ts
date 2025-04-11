import type { NextApiRequest, NextApiResponse } from "next";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { handleCors } from "@/utils/cors";
import { subdomainSettingsQuery, supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserData } from "@/types/types";

interface ResponseError {
  message: string;
}

interface Data {
  id?: string;
  path?: string;
  fullPath?: string;
}

type Response = Data | ResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  // if (handleCors(req, res)) return;

  const method = req.method;

  if (method === "POST") {
    // console.log("body: ", req.body.image);
    const { data, error } = await supabase.storage
      .from("cv-photos")
      .upload("public/generic-user.png", req.body, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      });

    if (error) {
      console.log("upload err: ", error);
      res.status(400).json({ message: "err" });
    }

    // res.status(200).send("ok");
    res.status(200).json({ ...data });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
