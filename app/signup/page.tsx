"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateSignup, hasErrors, type ValidationErrors } from "@/lib/validations";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateField(
    field: "name" | "email" | "password",
    value: string
  ) {
    const fields = { name, email, password, [field]: value };
    const allErrors = validateSignup(fields);
    setErrors((prev) => {
      const next = { ...prev };
      if (allErrors[field]) {
        next[field] = allErrors[field];
      } else {
        delete next[field];
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    // Full validation
    const validationErrors = validateSignup({ name, email, password });
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Signup failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 py-12">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card mb-3">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Learniee</h1>
          <p className="text-sm text-muted-foreground">Parent Dashboard</p>
        </div>

        <Card className="shadow-elevated border-border/60">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Get started tracking your child&apos;s learning journey
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Server error */}
              {serverError && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive animate-fade-in">
                  {serverError}
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) validateField("name", e.target.value);
                  }}
                  onBlur={() => validateField("name", name)}
                  className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                  autoComplete="name"
                  autoFocus
                />
                {errors.name && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="parent@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) validateField("email", e.target.value);
                  }}
                  onBlur={() => validateField("email", email)}
                  className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        validateField("password", e.target.value);
                    }}
                    onBlur={() => validateField("password", password)}
                    className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {errors.password}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
