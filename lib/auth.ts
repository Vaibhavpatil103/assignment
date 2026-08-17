import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SafeUser } from "./users";

/* ─── Config ───────────────────────────────────────────────────────────── */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "learniee-dev-secret-change-in-production"
);
const COOKIE_NAME = "learniee-session";
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

/* ─── JWT helpers ──────────────────────────────────────────────────────── */

export async function signToken(user: SafeUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_IN}s`)
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<{ sub: string; email: string; name: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { sub: string; email: string; name: string };
  } catch {
    return null;
  }
}

/* ─── Cookie helpers ───────────────────────────────────────────────────── */

export async function setSessionCookie(user: SafeUser): Promise<void> {
  const token = await signToken(user);
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: EXPIRES_IN,
  });
}

export function clearSessionCookie(): void {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionUser(): Promise<{
  sub: string;
  email: string;
  name: string;
} | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
