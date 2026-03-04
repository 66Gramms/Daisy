import { AdminLoginFormData } from "@/pages/admin/schema";
import { ApiRoutes } from "@/services/api/routes";
import sendRequest from "@/services/api/send-request";
import { AdminLoginResponse } from "@/services/api/admin/types";

export const adminLogin = async (data: AdminLoginFormData) => {
  const response = await sendRequest<AdminLoginResponse>(
    ApiRoutes.ADMIN_LOGIN,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  return response;
};
