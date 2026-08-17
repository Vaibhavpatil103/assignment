import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/50">
      <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Loader2 className="h-7 w-7 text-primary animate-spin" />
        </div>
        <p className="text-muted-foreground font-medium text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
