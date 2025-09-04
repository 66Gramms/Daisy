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
import adminLoginAction from "@/actions/admin";
import { registerPartyAction } from "@/actions/party";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/querykeys";

interface AdminLoginRegisterPageProps {
  hasParty: boolean;
}

export default function AdminLoginRegisterPage({
  hasParty,
}: AdminLoginRegisterPageProps) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {!hasParty && <RegisterPartyForm />}
      {hasParty && (showLogin ? <LoginForm /> : <RegisterForm />)}
      <button
        type="button"
        className="text-gray-200 hover:underline text-sm mt-2"
        onClick={() => setShowLogin((prev) => !prev)}
      >
        {showLogin ? "Register instead" : "Login instead"}
      </button>
    </>
  );
}

const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <Input
        label="Username"
        id="username"
        placeholder="66Gramms"
        // register={register}
        // error={errors.username?.message}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        // register={register}
        // error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        // register={register}
        // error={errors.confirmPassword?.message}
      />
      <Input
        label="Key"
        id="key"
        type="text"
        // register={register}
        // error={errors.key?.message}
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

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(AdminLoginSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = async (data: AdminLoginFormData) => {
    const resp = await adminLoginAction(data);
    queryClient.setQueryData([QueryKeys.ME], resp);
    router.replace("/admin");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        id="username"
        placeholder="66Gramms"
        register={register}
        error={errors.username?.message}
      />
      <Input
        label="Password"
        id="password"
        type="password"
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

const RegisterPartyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartyRegisterFormData>({
    resolver: zodResolver(PartyRegisterSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = async (data: PartyRegisterFormData) => {
    const resp = await registerPartyAction(data);
    queryClient.setQueryData([QueryKeys.ME], resp.username);
    queryClient.setQueryData([QueryKeys.PARTY], resp.partyname);
    router.replace("/admin");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Party Name"
        id="partyname"
        placeholder="qbparty 2016"
        register={register}
        error={errors.partyname?.message}
      />
      <Input
        label="Username"
        id="username"
        placeholder="66Gramms"
        register={register}
        error={errors.username?.message}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" disabled={Object.keys(errors).length > 0}>
        Register
      </Button>
    </form>
  );
};
