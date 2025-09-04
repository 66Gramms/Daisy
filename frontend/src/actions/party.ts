"use server";

import { Cookies } from "@/constants/cookies";
import { PartyRegisterFormData } from "@/pages/admin/schema";
import { registerParty } from "@/services/api/admin/party";
import { cookies } from "next/headers";

export const registerPartyAction = async (data: PartyRegisterFormData) => {
  const resp = await registerParty(data);
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
