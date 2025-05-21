import { DefaultSession } from "next-auth";
import { ISettings, ISubdomain, IUser } from "@/pages/api/types";

declare module "next-auth" {
  interface Session {
    user: {
      googleId: IUser["googleId"];
      subdomainSlug?: ISubdomain["slug"];
      userId: string;
      image?: ISettings["image"];
    } & DefaultSession["user"];
  }

  interface User {
    subdomainSlug?: ISubdomain["slug"];
    userId: string;
    image?: ISettings["image"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId: IUser["googleId"];
    subdomainSlug?: ISubdomain["slug"];
    userId: string;
    image?: ISettings["image"];
  }
}
