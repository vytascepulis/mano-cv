import { NextRequest, NextResponse } from "next/server";
import { getSubdomainFromUrl } from "@/utils/subdomain";

export const config = {
  matcher: ["/", "/ui", "/nustatymai"],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname =
    req.headers.get("host") || process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (!hostname) {
    throw Error("Middleware -> No hostname");
  }

  const sub = getSubdomainFromUrl(hostname);

  if (!sub) {
    url.pathname = `/home${url.pathname}`;
  } else {
    url.pathname = `/subdomains/${sub}${url.pathname}`;
  }

  if (url.pathname.includes("/ui") && process.env.NODE_ENV === "development") {
    url.pathname = "/ui";
  }

  return NextResponse.rewrite(url);
}
