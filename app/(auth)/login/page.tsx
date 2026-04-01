"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { getAuthErrorMessage } from "@/lib/api/auth-client";
import { useAuth } from "@/lib/auth";
import { useLoginMutation } from "@/lib/reactQuery/auth-mutations";
import { authResponseToSession } from "@/lib/types/auth";
import { cn } from "@/lib/utils";
import { LoginSchema, type LoginInput } from "@/lib/validations";

const inputClassName = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
  "ring-offset-background placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useLoginMutation();

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const data = await mutation.mutateAsync(values);
      if (!data.accessToken) {
        form.setError("root", { message: "Sign-in succeeded but no token was returned." });
        return;
      }
      setSession(authResponseToSession(data));
      router.push("/");
    } catch (error) {
      form.setError("root", { message: getAuthErrorMessage(error) });
    }
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use the email and password for your account.</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="login-email"
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
            <label htmlFor="login-password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              className={inputClassName}
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
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
            {mutation.isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
