import { NextResponse } from "next/server";
import { findUserByEmail, verifyPassword, toSafeUser } from "@/lib/users";
import { setSessionCookie } from "@/lib/auth";
import { validateLogin, hasErrors } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Server-side validation
    const errors = validateLogin({ email: email ?? "", password: password ?? "" });
    if (hasErrors(errors)) {
      return NextResponse.json({ error: Object.values(errors)[0] }, { status: 400 });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPassword(user, password);
    if (!valid) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Set session cookie
    const safeUser = toSafeUser(user);
    await setSessionCookie(safeUser);

    return NextResponse.json({ user: safeUser });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
