"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AuthRequestError, registerAccount } from "@/lib/api/auth-client";
import { useAuth } from "@/lib/auth";
import { authResponseToSession } from "@/lib/types/auth";
import { cn } from "@/lib/utils";
import { RegisterSchema, type RegisterInput } from "@/lib/validations";

const inputClassName = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
  "ring-offset-background placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

export default function RegisterPage() {
  const router = useRouter();
  const { setSession } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "Guest",
    },
  });

  const mutation = useMutation({
    mutationFn: registerAccount,
    onSuccess: (data) => {
      if (!data.accessToken) {
        form.setError("root", { message: "Registration succeeded but no token was returned." });
        return;
      }
      setSession(authResponseToSession(data));
      router.push("/");
    },
    onError: (error) => {
      const message =
        error instanceof AuthRequestError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Something went wrong.";
      form.setError("root", { message });
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Register as a guest or staff member.</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="register-name" className="text-sm font-medium text-foreground">
              Full name
            </label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              className={inputClassName}
              aria-invalid={!!form.formState.errors.fullName}
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName ? (
              <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="register-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              className={inputClassName}
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="register-password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              className={inputClassName}
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <span id="register-role-label" className="text-sm font-medium text-foreground">
              Account type
            </span>
            <div className="flex flex-col gap-2 sm:flex-row" role="group" aria-labelledby="register-role-label">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="radio" value="Guest" className="accent-primary" {...form.register("role")} />
                Guest
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="radio" value="Staff" className="accent-primary" {...form.register("role")} />
                Staff
              </label>
            </div>
            {form.formState.errors.role ? (
              <p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
            ) : null}
          </div>

          {form.formState.errors.root ? (
            <p className="text-sm text-destructive" role="alert">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60"
          >
            {mutation.isPending ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
