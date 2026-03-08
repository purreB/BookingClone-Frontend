export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input type="email" placeholder="Email" className="w-full p-2 border" />
        <input type="password" placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">Login</button>
      </form>
    </div>
  );
}