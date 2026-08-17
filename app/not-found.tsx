import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 px-4 text-center">
      <div className="space-y-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 shadow-sm">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">404</h1>
          <h2 className="text-xl font-semibold text-foreground">Page not found</h2>
          <p className="text-muted-foreground">
            Oops! It looks like the page you are looking for has been moved, deleted, or never existed.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Button asChild size="lg" className="rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
