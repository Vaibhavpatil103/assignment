import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* Routes that require authentication */
const PROTECTED_PATHS = ["/dashboard"];

/* Routes that should redirect to dashboard if already logged in */
const AUTH_PATHS = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const user = token ? await verifyToken(token) : null;

  /* ── Protect dashboard ──────────────────────────────────────────────── */
  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ── Redirect logged-in users away from auth pages ──────────────────── */
  if (AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
