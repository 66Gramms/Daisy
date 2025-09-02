"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminLoginFormData,
  AdminLoginSchema,
  PartyRegisterFormData,
  PartyRegisterSchema,
} from "./schema";
import { Input } from "../../components/molecules/Input";
import { Button } from "../../components/molecules/Button";
import { useMutation } from "@tanstack/react-query";
import { registerParty } from "@/services/api/admin/party";
import adminLoginAction from "@/actions/admin";

interface AdminLoginRegisterPageProps {
  hasParty: boolean;
}

export default function AdminLoginRegisterPage({
  hasParty,
}: AdminLoginRegisterPageProps) {
  const [showRegister, setShowRegister] = useState(!hasParty);

  return (
    <>
      {showRegister ? <RegisterPartyForm hasParty={hasParty} /> : <LoginForm />}
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(AdminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    await adminLoginAction(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
        autoComplete="current-password"
        register={register}
        error={errors.password?.message}
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

const RegisterPartyForm = ({ hasParty }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartyRegisterFormData>({
    resolver: zodResolver(PartyRegisterSchema),
  });

  const mutation = useMutation({
    mutationFn: registerParty,
    onSuccess: (resp) => {
      console.log("Registration successful!", resp);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: PartyRegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Party Name"
        id="partyname"
        placeholder="qbparty 2016"
        autoComplete="username"
        register={register}
        error={errors.partyname?.message}
      />
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
