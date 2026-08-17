"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Section wrapper                                                         */
/* ────────────────────────────────────────────────────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Style Guide Page                                                         */
/* ────────────────────────────────────────────────────────────────────────── */
export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Learniee Design System
              </h1>
              <p className="text-xs text-muted-foreground">
                Style Guide &amp; Component Library
              </p>
            </div>
          </div>
          <Badge variant="secondary">v0.1.0</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-14">
        {/* ── 1. Color Palette ─────────────────────────────────────────── */}
        <Section
          title="Color Palette"
          description="Trustworthy indigo primary, slate neutrals, and semantic accents."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: "Primary", css: "bg-primary", text: "text-primary-foreground" },
              { label: "Secondary", css: "bg-secondary", text: "text-secondary-foreground" },
              { label: "Muted", css: "bg-muted", text: "text-muted-foreground" },
              { label: "Destructive", css: "bg-destructive", text: "text-destructive-foreground" },
              { label: "Success", css: "bg-success", text: "text-success-foreground" },
              { label: "Warning", css: "bg-warning", text: "text-warning-foreground" },
            ].map((c) => (
              <div key={c.label} className="space-y-1.5">
                <div
                  className={`h-16 rounded-xl ${c.css} ${c.text} flex items-end p-2.5 text-xs font-medium shadow-soft`}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          {/* Neutral scale */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Neutral Scale (Slate)</p>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { bg: "bg-slate-50", name: "50" },
                { bg: "bg-slate-100", name: "100" },
                { bg: "bg-slate-200", name: "200" },
                { bg: "bg-slate-300", name: "300" },
                { bg: "bg-slate-400", name: "400" },
                { bg: "bg-slate-500", name: "500" },
                { bg: "bg-slate-600", name: "600" },
                { bg: "bg-slate-700", name: "700" },
                { bg: "bg-slate-800", name: "800" },
                { bg: "bg-slate-900", name: "900" },
                { bg: "bg-slate-950", name: "950" },
              ].map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-1">
                  <div
                    className={`h-10 w-10 rounded-lg ${s.bg} border border-border`}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Separator />

        {/* ── 2. Typography ────────────────────────────────────────────── */}
        <Section
          title="Typography"
          description="Inter font family with a clear size hierarchy."
        >
          <div className="space-y-4 rounded-2xl border border-border p-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Page Title
              </span>
              <h1 className="text-3xl font-bold tracking-tight mt-1">
                Parent Dashboard
              </h1>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Section Title
              </span>
              <h2 className="text-xl font-semibold tracking-tight mt-1">
                Weekly Progress Report
              </h2>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Card Title
              </span>
              <h3 className="text-lg font-semibold leading-none mt-1">
                Mathematics — Grade 5
              </h3>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Body
              </span>
              <p className="text-sm text-foreground mt-1 max-w-prose">
                Your child scored 92% in the latest assessment. They&apos;ve
                shown consistent improvement in problem-solving and
                critical-thinking skills over the past four weeks.
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Caption
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated 2 hours ago · Report generated automatically
              </p>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ── 3. Buttons ───────────────────────────────────────────────── */}
        <Section
          title="Buttons"
          description="All variants and sizes with micro-press animation."
        >
          {/* Variants */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">
                <CheckCircle2 className="mr-1 h-4 w-4" /> Success
              </Button>
              <Button variant="warning">
                <AlertTriangle className="mr-1 h-4 w-4" /> Warning
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3 mt-6">
            <p className="text-sm font-medium">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Disabled */}
          <div className="space-y-3 mt-6">
            <p className="text-sm font-medium">States</p>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ── 4. Inputs & Select ───────────────────────────────────────── */}
        <Section
          title="Inputs & Select"
          description="Rounded inputs with smooth focus transitions."
        >
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input id="student-name" placeholder="Enter student name…" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search courses…"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Grade Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                  <SelectItem value="6">Grade 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="parent@email.com"
                disabled
              />
              <p className="text-xs text-muted-foreground">Disabled state</p>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ── 5. Badges ────────────────────────────────────────────────── */}
        <Section
          title="Badges"
          description="Status indicators and labels."
        >
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Overdue</Badge>
            <Badge variant="success">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
            </Badge>
            <Badge variant="warning">
              <AlertTriangle className="mr-1 h-3 w-3" /> Needs Review
            </Badge>
          </div>
        </Section>

        <Separator />

        {/* ── 6. Cards ─────────────────────────────────────────────────── */}
        <Section
          title="Cards"
          description="Soft shadow, rounded-2xl, hover elevation."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Stat card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Courses Enrolled
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +2 from last semester
                </p>
              </CardContent>
            </Card>

            {/* Progress card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Score
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: "92%" }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Attendance card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Attendance Rate
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  2 days missed this term
                </p>
              </CardContent>
            </Card>

            {/* Full card with footer */}
            <Card className="sm:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Latest Achievement</CardTitle>
                <CardDescription>
                  Recognized for outstanding performance in Science Fair 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Gold Medal — Science Fair</p>
                    <p className="text-sm text-muted-foreground">
                      Project: &quot;Sustainable Water Filtration System&quot;
                    </p>
                  </div>
                  <Badge variant="success" className="ml-auto">
                    Awarded
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Awarded on August 12, 2025
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* ── 7. Dialog ────────────────────────────────────────────────── */}
        <Section
          title="Dialog"
          description="Modal with backdrop blur and smooth enter/exit."
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Parent-Teacher Meeting</DialogTitle>
                <DialogDescription>
                  Choose a time slot to discuss your child&apos;s progress with
                  their teacher.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Time Slot</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                      <SelectItem value="4pm">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Separator />

        {/* ── 8. Skeleton ──────────────────────────────────────────────── */}
        <Section
          title="Skeleton"
          description="Loading placeholders for async content."
        >
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[140px]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[85%]" />
              <Skeleton className="h-3 w-[70%]" />
            </CardContent>
          </Card>
        </Section>

        <Separator />

        {/* ── 9. Pagination ────────────────────────────────────────────── */}
        <Section
          title="Pagination"
          description="Page navigation with active state."
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        <Separator />

        {/* ── 10. Spacing & Radius Reference ───────────────────────────── */}
        <Section
          title="Spacing & Radius"
          description="Tailwind's default 4px scale. Border radius tokens."
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Spacing */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Spacing Scale (4px base)</p>
              <div className="space-y-1">
                {[
                  { name: "1 (4px)", w: "w-1" },
                  { name: "2 (8px)", w: "w-2" },
                  { name: "3 (12px)", w: "w-3" },
                  { name: "4 (16px)", w: "w-4" },
                  { name: "6 (24px)", w: "w-6" },
                  { name: "8 (32px)", w: "w-8" },
                  { name: "12 (48px)", w: "w-12" },
                  { name: "16 (64px)", w: "w-16" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div
                      className={`h-3 ${s.w} rounded bg-primary/60`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Border Radius Tokens</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "sm", cls: "rounded-sm" },
                  { name: "md", cls: "rounded-md" },
                  { name: "lg", cls: "rounded-lg" },
                  { name: "xl", cls: "rounded-xl" },
                  { name: "2xl", cls: "rounded-2xl" },
                  { name: "full", cls: "rounded-full" },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={`h-14 w-14 ${r.cls} bg-primary/15 border border-primary/30`}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {r.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="border-t border-border pt-8 pb-12 text-center text-xs text-muted-foreground">
          Learniee Parent Dashboard — Design System v0.1.0
        </footer>
      </main>
    </div>
  );
}
