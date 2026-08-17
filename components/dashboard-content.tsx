"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Search,
  BookOpen,
  Heart,
  X,
  ChevronDown,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { CourseCard, type Course } from "@/components/course-card";
import { CourseCardSkeleton } from "@/components/course-card-skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import coursesData from "@/data/courses.json";

interface DashboardContentProps {
  user: { id: string; name: string; email: string };
}

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Coding",
  "Art",
  "Music",
  "Life Skills",
];
const GRADE_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const firstName = user.name.split(" ")[0];
  const [isClient, setIsClient] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  // -- URL State Extraction --
  const q = searchParams.get("q") || "";
  const grades = searchParams.get("grades")?.split(",").map(Number) || [];
  const subjects = searchParams.get("subjects")?.split(",") || [];
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 6000;
  const minRating = Number(searchParams.get("minRating")) || 0;
  const sort = searchParams.get("sort") || "recommended";
  const page = Number(searchParams.get("page")) || 1;

  // -- Updaters --
  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    if (!("page" in updates)) {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    updateQuery({ q: value });
  }, 400);

  const toggleArrayFilter = (key: string, value: string, current: string[]) => {
    const next = current.includes(value)
      ? current.filter((i) => i !== value)
      : [...current, value];
    updateQuery({ [key]: next.length > 0 ? next.join(",") : null });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const removeFilter = (key: string, valueToRemove?: string) => {
    if (!valueToRemove) {
      updateQuery({ [key]: null });
    } else {
      const current = searchParams.get(key)?.split(",") || [];
      const next = current.filter((v) => v !== valueToRemove);
      updateQuery({ [key]: next.length > 0 ? next.join(",") : null });
    }
  };

  // -- Filtering Logic --
  const filteredCourses = useMemo(() => {
    let result = (coursesData as Course[]).filter((c) => {
      if (q) {
        const query = q.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesSubject = c.subject.toLowerCase().includes(query);
        const matchesTeacher = c.teacherName.toLowerCase().includes(query);
        if (!matchesName && !matchesSubject && !matchesTeacher) return false;
      }
      if (subjects.length > 0 && !subjects.includes(c.subject)) return false;
      if (grades.length > 0) {
        const overlaps = grades.some((g) => g >= c.grade[0] && g <= c.grade[1]);
        if (!overlaps) return false;
      }
      if (c.price < minPrice || c.price > maxPrice) return false;
      if (c.teacherRating < minRating) return false;

      return true;
    });

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-high":
        result.sort((a, b) => b.teacherRating - a.teacherRating);
        break;
      case "recommended":
      default:
        result.sort(
          (a, b) =>
            b.teacherRating * 1000 -
            a.price -
            (a.teacherRating * 1000 - b.price)
        );
        break;
    }
    return result;
  }, [q, subjects, grades, minPrice, maxPrice, minRating, sort]);

  const itemsPerPage = 8;
  const displayedCourses = filteredCourses.slice(0, page * itemsPerPage);
  const hasMore = displayedCourses.length < filteredCourses.length;

  // -- Filter UI Content --
  const FilterContent = (
    <div className="space-y-8">
      {/* Subjects */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Subject</h3>
        <div className="space-y-2">
          {SUBJECT_OPTIONS.map((sub) => (
            <div key={sub} className="flex items-center space-x-2">
              <Checkbox
                id={`sub-${sub}`}
                checked={subjects.includes(sub)}
                onCheckedChange={() =>
                  toggleArrayFilter("subjects", sub, subjects)
                }
              />
              <label
                htmlFor={`sub-${sub}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {sub}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Grades */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Grade Level</h3>
        <div className="grid grid-cols-4 gap-2">
          {GRADE_OPTIONS.map((g) => {
            const isActive = grades.includes(g);
            return (
              <button
                key={g}
                onClick={() =>
                  toggleArrayFilter("grades", g.toString(), grades.map(String))
                }
                className={`h-9 rounded-md text-sm font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-input hover:bg-accent"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Price Range (₹)</h3>
          <span className="text-xs text-muted-foreground">
            {minPrice} - {maxPrice}
          </span>
        </div>
        <Slider
          defaultValue={[minPrice, maxPrice]}
          max={6000}
          step={100}
          onValueChange={(val) => {
            updateQuery({
              minPrice: val[0].toString(),
              maxPrice: val[1].toString(),
            });
          }}
          className="py-4"
        />
      </div>

      {/* Teacher Rating */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Minimum Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) =>
                  updateQuery({ minRating: checked ? rating.toString() : null })
                }
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none flex items-center gap-1 cursor-pointer"
              >
                {rating}+ Stars
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar user={user} />

      {/* ── Welcome Section ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border/40 py-8 px-4 sm:px-6 lg:px-8 transition-all">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-muted-foreground max-w-lg text-sm sm:text-base">
                Discover new learning opportunities to keep your child engaged.
              </p>
            </div>

            <div className="flex gap-4">
              <Card className="min-w-[140px] shadow-sm bg-primary/5 border-primary/10 transition-shadow duration-200 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                  <CardTitle className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Enrolled
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-foreground">4</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Layout ─────────────────────────────────────────────── */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 items-start relative">
        {/* Sidebar Filters (Desktop) */}
        <aside className="w-64 shrink-0 hidden md:block">
          {FilterContent}
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 space-y-6 min-w-0 w-full">
          {/* Search & Top Controls */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue={q}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search courses, subjects, or teachers..."
                  className="w-full h-11 pl-9 pr-4 rounded-xl border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 text-sm transition-all duration-200"
                />
              </div>

              {/* Mobile Filter Sheet */}
              <Sheet
                open={isMobileFiltersOpen}
                onOpenChange={setIsMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden h-11 shrink-0 transition-all duration-200">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl sm:h-auto sm:rounded-l-3xl sm:rounded-tr-none">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto max-h-[70vh] pb-8 pr-4 custom-scrollbar">
                    {FilterContent}
                  </div>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 shrink-0 hidden sm:flex transition-all duration-200"
                  >
                    Sort:{" "}
                    {sort === "recommended"
                      ? "Recommended"
                      : sort === "price-low"
                      ? "Price: Low to High"
                      : sort === "price-high"
                      ? "Price: High to Low"
                      : "Highest Rated"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(val) => updateQuery({ sort: val })}
                  >
                    <DropdownMenuRadioItem value="recommended">
                      Recommended
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-low">
                      Price: Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-high">
                      Price: High to Low
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating-high">
                      Highest Rated
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Active Filters Row */}
            {isClient &&
              (q ||
                subjects.length > 0 ||
                grades.length > 0 ||
                minPrice > 0 ||
                maxPrice < 6000 ||
                minRating > 0) && (
                <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="text-xs font-medium text-muted-foreground mr-1">
                    Active:
                  </span>

                  {q && (
                    <Badge
                      variant="secondary"
                      className="pl-2 pr-1 py-1 h-7 font-normal transition-all duration-200"
                    >
                      Search: {q}
                      <button
                        onClick={() => removeFilter("q")}
                        className="ml-1 hover:bg-muted rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  {subjects.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 h-7 font-normal bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 transition-all duration-200"
                    >
                      {s}
                      <button
                        onClick={() => removeFilter("subjects", s)}
                        className="ml-1 rounded-full p-0.5 hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {grades.map((g) => (
                    <Badge
                      key={`grade-${g}`}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 h-7 font-normal bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 transition-all duration-200"
                    >
                      Grade {g}
                      <button
                        onClick={() => removeFilter("grades", g.toString())}
                        className="ml-1 rounded-full p-0.5 hover:bg-purple-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {(minPrice > 0 || maxPrice < 6000) && (
                    <Badge
                      variant="secondary"
                      className="pl-2 pr-1 py-1 h-7 font-normal transition-all duration-200"
                    >
                      ₹{minPrice} - ₹{maxPrice}
                      <button
                        onClick={() => {
                          updateQuery({ minPrice: null, maxPrice: null });
                        }}
                        className="ml-1 hover:bg-muted rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  {minRating > 0 && (
                    <Badge
                      variant="secondary"
                      className="pl-2 pr-1 py-1 h-7 font-normal transition-all duration-200"
                    >
                      {minRating}+ Stars
                      <button
                        onClick={() => removeFilter("minRating")}
                        className="ml-1 hover:bg-muted rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-7 text-xs ml-auto transition-all duration-200"
                  >
                    Clear all
                  </Button>
                </div>
              )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"} found
            </h3>
          </div>

          {/* Grid View */}
          {!isClient ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : displayedCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {displayedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              {/* Pagination */}
              {hasMore && (
                <div className="pt-8 pb-4 flex justify-center animate-in fade-in">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] transition-all duration-200 hover:shadow-md"
                    onClick={() => updateQuery({ page: (page + 1).toString() })}
                  >
                    Load More Courses
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-dashed border-border rounded-2xl bg-white/50 animate-in fade-in duration-500">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <SearchX className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">
                No courses match your filters
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                We couldn&apos;t find anything matching your current criteria.
                Try adjusting the price range or clearing some filters.
              </p>
              <Button
                onClick={clearFilters}
                className="transition-all duration-200"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
