"use server";

import { cookies } from "next/headers";
import { AdminLoginFormData } from "@/pages/admin/schema";
import { adminLogin } from "@/services/api/admin";
import { Cookies } from "@/constants/cookies";

const adminLoginAction = async (data: AdminLoginFormData) => {
  const resp = await adminLogin(data);

  const cookieStore = await cookies();
  cookieStore.set({
    name: Cookies.BEARER_TOKEN,
    value: resp.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return resp;
};

export default adminLoginAction;
