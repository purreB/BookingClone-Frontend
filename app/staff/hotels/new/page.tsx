"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { HotelRequestError } from "@/lib/api/hotels-client";
import { canManageHotels } from "@/lib/auth-roles";
import { useAuth } from "@/lib/auth";
import { useCreateHotel } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { CreateHotelSchema, type CreateHotelInput } from "@/lib/validations";

const inputClassName = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
  "ring-offset-background placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

export default function NewHotelPage() {
  const router = useRouter();
  const { user, accessToken, isReady } = useAuth();
  const createHotelMutation = useCreateHotel(accessToken);

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  const form = useForm<CreateHotelInput>({
    resolver: zodResolver(CreateHotelSchema),
    defaultValues: { name: "", address: "" },
  });

  if (!isReady) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!canManageHotels(user.roles)) {
    return (
      <div className="container mx-auto max-w-lg p-4">
        <h1 className="text-2xl font-semibold text-foreground">Create hotel</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account does not have permission to create hotels. Staff or owner access is required.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg p-4">
      <div className="mb-6">
        <Link href="/staff" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          Staff dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Create hotel</h1>
        <p className="mt-1 text-sm text-muted-foreground">Add a new property to the directory.</p>
      </div>

      <form
        className="space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm"
        onSubmit={form.handleSubmit((values) =>
          createHotelMutation.mutate(values, {
            onSuccess: () => {
              router.push("/staff");
            },
            onError: (error) => {
              const message =
                error instanceof HotelRequestError
                  ? error.message
                  : error instanceof Error
                    ? error.message
                    : "Something went wrong.";
              form.setError("root", { message });
            },
          }),
        )}
        noValidate
      >
        <div className="space-y-2">
          <label htmlFor="hotel-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="hotel-name"
            type="text"
            autoComplete="organization"
            className={inputClassName}
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          {form.formState.errors.name ? (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="hotel-address" className="text-sm font-medium text-foreground">
            Address
          </label>
          <input
            id="hotel-address"
            type="text"
            autoComplete="street-address"
            className={inputClassName}
            aria-invalid={!!form.formState.errors.address}
            {...form.register("address")}
          />
          {form.formState.errors.address ? (
            <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
          ) : null}
        </div>

        {form.formState.errors.root ? (
          <p className="text-sm text-destructive" role="alert">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={createHotelMutation.isPending}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60"
        >
          {createHotelMutation.isPending ? "Creating…" : "Create hotel"}
        </Button>
      </form>
    </div>
  );
}
