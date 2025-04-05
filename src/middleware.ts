import { NextRequest, NextResponse } from "next/server";
import { getSubdomainFromUrl } from "@/utils/subdomain";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/", "/subdomains/:slug*"],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname =
    req.headers.get("host") || process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (!hostname) {
    throw Error("Middleware -> No hostname");
  }

  const sub = getSubdomainFromUrl(hostname);
  const token = await getToken({ req });
  console.log("token", token);

  if (!sub) {
    url.pathname = `/home${url.pathname}`;
  } else {
    url.pathname = `/subdomains/${sub}${url.pathname}`;
  }

  // Protect /subdomains route
  if (req.url.includes("/subdomains")) {
    url.pathname = "/404";
  }

  return NextResponse.rewrite(url);
}
