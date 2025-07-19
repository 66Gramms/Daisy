import React from "react";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="party-name" className="font-medium">
          Party Name
        </label>
        <input
          id="party-name"
          type="text"
          className="px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:opacity-40"
          autoComplete="username"
          placeholder="qbparty 2016"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:opacity-40"
          autoComplete="username"
          placeholder="66Gramms"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className=" font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className=" font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoComplete="new-password"
        />
      </div>
      <button
        type="submit"
        className="mt-4 py-2 rounded bg-green-500 text-black font-bold hover:bg-green-600 transition-colors"
      >
        Register
      </button>
    </form>
  );
}
