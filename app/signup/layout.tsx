import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — Learniee Parent Dashboard",
  description: "Create your Learniee Parent Dashboard account to track your child's progress.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
