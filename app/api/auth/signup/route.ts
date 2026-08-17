import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";
import { setSessionCookie } from "@/lib/auth";
import { validateSignup, hasErrors } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Server-side validation
    const errors = validateSignup({ name: name ?? "", email: email ?? "", password: password ?? "" });
    if (hasErrors(errors)) {
      return NextResponse.json({ error: Object.values(errors)[0] }, { status: 400 });
    }

    // Create user (throws if email already exists)
    const user = await createUser(name, email, password);

    // Set session cookie
    await setSessionCookie(user);

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
