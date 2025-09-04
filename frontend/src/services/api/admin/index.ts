import { AdminLoginFormData } from "@/pages/admin/schema";
import { ApiRoutes } from "../routes";
import sendRequest from "../send-request";
import { adminLoginResponse } from "./types";

export const adminLogin = async (data: AdminLoginFormData) => {
  const response = await sendRequest<adminLoginResponse>(
    ApiRoutes.ADMIN_LOGIN,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  return response;
};
