import type { NextApiRequest, NextApiResponse } from "next";
import {
  registerSlugMutation,
  updateUserSubdomainMutation,
} from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { RegisterData } from "@/types/types";

interface ResponseError {
  message: string;
}

type Response = RegisterData | ResponseError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const method = req.method;
  const slug = req.body.slug;

  if (method === "POST" && slug) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const { data: registerSlugData, error: registerSlugError } =
      await registerSlugMutation({
        slug,
      });

    if (registerSlugError) {
      console.log("Error registering slug: ", registerSlugError);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const { data: updateSubdomainData, error: updateSubdomainError } =
      await updateUserSubdomainMutation({
        hashedGoogleId: session.user.googleId,
        subdomainUuid: registerSlugData.id,
      });

    if (updateSubdomainError || !updateSubdomainData?.subdomain) {
      console.log("Error updating subdomain: ", updateSubdomainError);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    res.status(200).json({
      id: updateSubdomainData.subdomain.id,
      slug: updateSubdomainData.subdomain.slug,
    });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
