"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function AuthSwitcher() {
  const [showRegister, setShowRegister] = useState(true);
  return (
    <>
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <button
        type="button"
        className="text-gray-200 hover:underline text-sm mt-2"
        onClick={() => setShowRegister((r) => !r)}
      ></button>
    </>
  );
}
