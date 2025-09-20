"use server";

import { cookies } from "next/headers";
import { AdminLoginFormData } from "@/pages/admin/schema";
import { adminLogin } from "@/services/api/admin";
import { Cookies } from "@/constants/cookies";
import { redirect, RedirectType } from "next/navigation";

const adminLoginAction = async (data: AdminLoginFormData) => {
  const resp = await adminLogin(data);
  const { token, ...rest } = resp;

  const cookieStore = await cookies();
  cookieStore.set({
    name: Cookies.BEARER_TOKEN,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return rest;
};

export const adminLogoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(Cookies.BEARER_TOKEN);
  redirect("/admin/login", RedirectType.replace);
};

export default adminLoginAction;
