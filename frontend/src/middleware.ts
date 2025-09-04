import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cookies } from "./constants/cookies";

export function middleware(request: NextRequest) {
  const bearer = request.cookies.get(Cookies.BEARER_TOKEN);
  if (
    !bearer &&
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextUrl.pathname !== "/admin/login"
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
