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

type Response = { data: Blob | null } | ResponseError;

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  // if (handleCors(req, res)) return;

  const method = req.method;

  if (method === "POST") {
    // const { data, error } = await supabase.storage
    //   .from("cv-photos")
    //   .download("public/avatar1.jpg");

    const { data } = supabase.storage
      .from("user-files")
      .getPublicUrl("public/unnamed.jpg");

    // if (error) {
    //   console.log("download err: ", error);
    //   res.status(400).json({ message: "err" });
    // }

    // const base = await blobToBase64(data!);

    // console.log("base: ", base);
    res.status(200).json({ message: data.publicUrl });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
