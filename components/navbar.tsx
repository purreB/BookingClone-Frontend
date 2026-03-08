import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <div className="font-bold text-lg">MyApp</div>

            <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
                <Link href="/profile">Profile</Link>
            </div>
        </nav>
    );
}