"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLoginRegisterFormData, AdminLoginRegisterSchema } from "./schema";
import { FormInput } from "../../components/molecules/FormInput";
import { FormButton } from "../../components/molecules/FormButton";

export default function AdminLoginRegisterPage() {
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

const LoginForm = () => {
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
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginRegisterFormData>({
    resolver: zodResolver(AdminLoginRegisterSchema),
  });

  const onSubmit = (data: AdminLoginRegisterFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Party Name"
        id="partyName"
        placeholder="qbparty 2016"
        autoComplete="username"
        register={register}
        error={errors.partyName?.message}
      />
      <FormInput
        label="Username"
        id="username"
        placeholder="66Gramms"
        autoComplete="username"
        register={register}
        error={errors.username?.message}
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
        register={register}
        error={errors.password?.message}
      />
      <FormInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        register={register}
        error={errors.confirmPassword?.message}
      />
      <FormButton type="submit" disabled={Object.keys(errors).length > 0}>
        Register
      </FormButton>
    </form>
  );
};
