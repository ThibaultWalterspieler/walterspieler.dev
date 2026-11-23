import { NextRequest, NextResponse } from "next/server";

// Not a next.config.ts redirect: those match paths case-insensitively, so a
// `/99Stud` → `/99stud` rule would also catch `/99stud` and loop.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/99Stud") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/99stud";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/99Stud"],
};
