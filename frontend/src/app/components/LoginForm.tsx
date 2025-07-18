export default function LoginForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-green-400 font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoComplete="username"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-green-400 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="mt-4 py-2 rounded bg-green-500 text-black font-bold hover:bg-green-600 transition-colors"
      >
        Login
      </button>
    </form>
  );
}
