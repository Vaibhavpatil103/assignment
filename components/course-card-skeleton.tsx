import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-card">
      {/* Thumbnail */}
      <Skeleton className="h-40 sm:h-44 w-full rounded-none" />

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        {/* Subject */}
        <div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {/* Title */}
        <div className="space-y-2 flex-1 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Teacher + Rating row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-12 rounded" />
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border/60">
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
