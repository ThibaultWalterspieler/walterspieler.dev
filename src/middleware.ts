import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/fr/") || pathname === "/fr") {
    const newPath = pathname.replace("/fr", "");
    return NextResponse.redirect(new URL(newPath || "/", request.url), {
      status: 301,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|admin).*)"],
};
