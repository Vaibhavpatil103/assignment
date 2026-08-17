import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { DashboardContent } from "@/components/dashboard-content";
import { Suspense } from "react";

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading dashboard...</div>}>
      <DashboardContent
        user={{ id: user.sub, name: user.name, email: user.email }}
      />
    </Suspense>
  );
}
