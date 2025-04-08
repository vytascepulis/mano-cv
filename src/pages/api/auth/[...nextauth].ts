import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { sha256 } from "@/utils/crypto";
import { createUserMutation, userDataByGoogleIdQuery } from "@/lib/supabase";
import { ErrorCodes } from "@/constants/postgrest";

const sessionTokenName =
  process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

const sessionTokenDomain =
  process.env.NODE_ENV === "production"
    ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : "localhost";

export const authOptions: AuthOptions = {
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
        domain: sessionTokenDomain,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ profile, user }) {
      if (!profile?.sub) {
        return false;
      }

      const { data: userData, error } = await userDataByGoogleIdQuery({
        hashedGoogleId: sha256(profile.sub),
      });

      if (error && error.code !== ErrorCodes.NOT_FOUND) {
        return false;
      }

      if (userData) {
        user.status = userData.status;
        user.subdomainSlug = userData.subdomain?.slug;
      }

      if (!userData) {
        const { data: createData, error: createError } =
          await createUserMutation({
            hashedGoogleId: sha256(profile.sub),
            email: profile.email!,
          });

        if (createError) {
          return false;
        }

        user.status = createData.status;
      }

      return true;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "update") {
        const { data: userData } = await userDataByGoogleIdQuery({
          hashedGoogleId: token.googleId,
        });

        if (userData) {
          token.userStatus = userData.status;
          token.subdomainSlug = userData.subdomain?.slug;
        }
      }

      if (account && profile?.sub) {
        token.googleId = sha256(profile.sub);
        token.userStatus = user.status;
        token.subdomainSlug = user.subdomainSlug;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.googleId = token.googleId;
        session.user.status = token.userStatus;
        session.user.subdomainSlug = token.subdomainSlug;
      }

      return session;
    },
  },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
