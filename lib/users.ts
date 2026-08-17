import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

/** Serializable user (no password hash) */
export type SafeUser = Omit<User, "passwordHash">;

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function readUsers(): User[] {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function toSafeUser(user: User): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

/* ─── Public API ───────────────────────────────────────────────────────── */

export function findUserByEmail(email: string): User | undefined {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return readUsers().find((u) => u.id === id);
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<SafeUser> {
  const users = readUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("A user with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return toSafeUser(newUser);
}

export async function verifyPassword(
  user: User,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export { toSafeUser };
