"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLoginRegisterFormData, AdminPartyRegisterSchema } from "./schema";
import { Input } from "../../components/molecules/Input";
import { Button } from "../../components/molecules/Button";
import { useMutation } from "@tanstack/react-query";

interface AdminLoginRegisterPageProps {
  hasParty: boolean;
}

export default function AdminLoginRegisterPage({
  hasParty,
}: AdminLoginRegisterPageProps) {
  const [showRegister, setShowRegister] = useState(!hasParty);

  return (
    <>
      {showRegister ? <RegisterForm hasParty={hasParty} /> : <LoginForm />}
      <button
        type="button"
        className="text-gray-200 hover:underline text-sm mt-2"
        onClick={() => setShowRegister((r) => !r)}
      >
        {showRegister ? "Login instead" : "Register instead"}
      </button>
    </>
  );
}

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <Input
        label="Username"
        id="username"
        placeholder="66Gramms"
        autoComplete="username"
      />
      <Input
        label="Password"
        id="password"
        type="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        className="mt-4 py-2 rounded bg-green-500 text-black font-bold hover:bg-green-600 transition-colors"
      >
        Login
      </Button>
    </form>
  );
};

interface RegisterFormProps {
  hasParty: boolean;
}

const RegisterForm = ({ hasParty }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginRegisterFormData>({
    resolver: zodResolver(AdminPartyRegisterSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: AdminLoginRegisterFormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/party/register-party`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Unknown error");
      }

      return response.json();
    },
    onSuccess: (resp) => {
      console.log("Registration successful!", resp);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: AdminLoginRegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {!hasParty && (
        <Input
          label="Party Name"
          id="partyname"
          placeholder="qbparty 2016"
          autoComplete="username"
          register={register}
          error={errors.partyname?.message}
        />
      )}
      {/* {hasParty && (
        <FormInput
          label="Admin Key"
          id="adminKey"
          placeholder="Enter admin key"
          autoComplete="username"
          disabled
          register={register}
          error={errors.adminKey?.message}
        />
      )} */}
      <Input
        label="Username"
        id="username"
        placeholder="66Gramms"
        autoComplete="username"
        register={register}
        error={errors.username?.message}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
        register={register}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        register={register}
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" disabled={Object.keys(errors).length > 0}>
        Register
      </Button>
    </form>
  );
};
