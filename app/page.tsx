import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 px-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
            <GraduationCap className="h-8 w-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Learniee Parent Dashboard
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Track your child&apos;s learning progress, attendance, and
            achievements — all in one place.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/style-guide">
              View Style Guide <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
