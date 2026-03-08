export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <input type="text" placeholder="Name" className="w-full p-2 border" />
        <input type="email" placeholder="Email" className="w-full p-2 border" />
        <input type="password" placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">Register</button>
      </form>
    </div>
  );
}