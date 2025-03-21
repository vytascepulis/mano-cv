import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/subdomains/:slug*"],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname =
    req.headers.get("host") || process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (!hostname) {
    throw Error("Middleware -> No hostname");
  }

  const currentHost = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    "",
  );

  if (currentHost === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    url.pathname = `/home${url.pathname}`;
  } else {
    url.pathname = `/subdomains/${currentHost}${url.pathname}`;
  }

  // Protect /subdomains route
  if (req.url.includes("/subdomains")) {
    url.pathname = "/404";
  }

  return NextResponse.rewrite(url);
}
