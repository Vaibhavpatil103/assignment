import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Learniee Parent Dashboard",
  description: "Sign in to your Learniee Parent Dashboard account.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
