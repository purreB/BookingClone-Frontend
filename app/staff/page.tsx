import Link from "next/link";

export default function StaffPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Manage hotels and bookings here.</p>
      <p className="mt-4">
        <Link
          href="/staff/hotels/new"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Create a hotel
        </Link>
      </p>
    </div>
  );
}