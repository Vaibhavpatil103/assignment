import Image from "next/image";
import { Star, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Course {
  id: string;
  name: string;
  subject: string;
  grade: number[];
  price: number;
  teacherName: string;
  teacherRating: number;
  description: string;
  imageUrl: string;
}

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5">
      {/* ── Image thumbnail ───────────────────────────────────────── */}
      <div className="relative h-40 sm:h-44 w-full bg-muted">
        <Image
          src={course.imageUrl}
          alt={course.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Grade badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/95 text-foreground backdrop-blur-sm text-[11px] font-medium shadow-sm"
          >
            Grades {course.grade[0]}–{course.grade[1]}
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3">
          <div className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-white text-xs font-semibold shadow-sm">
            ₹{course.price.toLocaleString()}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        {/* Subject */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/20 bg-primary/5 uppercase tracking-wider">
            {course.subject}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
          {course.name}
        </h3>

        {/* Teacher + Rating row */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 line-clamp-1">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] text-foreground font-bold border border-border">
              {course.teacherName[8] || 'T'}
            </span>
            {course.teacherName}
          </p>

          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-500 shrink-0">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-[11px] font-bold">{course.teacherRating.toFixed(1)}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-3 border-t border-border/60">
          <Button size="sm" className="w-full h-9 rounded-xl shadow-sm text-xs font-semibold">
            View / Book
          </Button>
        </div>
      </div>
    </div>
  );
}
