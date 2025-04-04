import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { sha256 } from "@/utils/crypto";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const sessionTokenName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    cookies: {
      sessionToken: {
        name: sessionTokenName,
        options: {
          domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        },
      },
    },
    callbacks: {
      async jwt({ token, account, profile }) {
        if (account && profile) {
          token.googleId = sha256(profile.sub!);
        }

        return token;
      },
    },
  });
}
