import { DefaultSession } from "next-auth";
import { User as UserData, Subdomain } from "@/types/types";

declare module "next-auth" {
  interface Session {
    user: {
      googleId: string;
      status: UserData["status"];
      subdomainSlug?: Subdomain["slug"];
      id: UserData["id"];
    } & DefaultSession["user"];
  }

  interface User {
    status: UserData["status"];
    subdomainSlug?: Subdomain["slug"];
    id: UserData["id"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId: string;
    userStatus: UserData["status"];
    subdomainSlug?: Subdomain["slug"];
    image?: string | null;
    id: UserData["id"];
  }
}
