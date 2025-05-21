import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUserByGoogleId } from "@/lib/handlers";
import { sha256 } from "@/utils/crypto";

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
        console.log("no profile sub: ", profile);
        return false;
      }

      const { data: userData } = await getUserByGoogleId({
        hashedGoogleId: sha256(profile.sub),
      });

      if (userData) {
        user.userId = userData.id;
        user.userStatus = userData.status;
        user.subdomainSlug = userData.subdomainSlug;
        user.image = userData.image;
      }

      if (!userData) {
        const { data: createData, error: createError } = await createUser({
          hashedGoogleId: sha256(profile.sub),
          email: profile.email!,
        });

        if (createError) {
          return false;
        }

        user.userStatus = createData.status;
        user.userId = createData.id;
      }

      return true;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "update") {
        const { data: userData } = await getUserByGoogleId({
          hashedGoogleId: token.googleId,
        });

        if (userData) {
          token.userStatus = userData.status;
          token.subdomainSlug = userData.subdomainSlug;
          token.image = userData.image;
        }
      }

      if (account && profile?.sub) {
        token.googleId = sha256(profile.sub);
        token.subdomainSlug = user.subdomainSlug;
        token.userId = user.userId;
        token.image = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.googleId = token.googleId;
        session.user.userStatus = token.userStatus;
        session.user.subdomainSlug = token.subdomainSlug;
        session.user.userId = token.userId;
        session.user.image = token.image;
      }

      return session;
    },
  },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
