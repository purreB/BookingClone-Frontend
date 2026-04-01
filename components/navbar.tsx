"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, isReady, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b border-border p-4">
      <div className="text-lg font-semibold text-foreground">MyApp</div>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/" className="text-sm text-foreground hover:underline">
          Home
        </Link>
        {!isReady ? null : user ? (
          <>
            <span className="max-w-48 truncate text-sm text-muted-foreground" title={user.email ?? undefined}>
              {user.fullName ?? user.email ?? user.userId}
            </span>
            <Link href="/profile" className="text-sm text-foreground hover:underline">
              Profile
            </Link>
            <Button
              type="button"
              onClick={() => logout()}
              className="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-foreground hover:underline">
              Sign in
            </Link>
            <Link href="/register" className="text-sm text-foreground hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
