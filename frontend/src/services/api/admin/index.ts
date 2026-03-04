import { AdminLoginFormData } from "@/pages/admin/schema";
import { ApiRoutes } from "@/services/api/routes";
import sendRequest from "@/services/api/send-request";
import { adminLoginResponse } from "@/services/api/admin/types";

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
