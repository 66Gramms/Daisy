import { AdminLoginRegisterFormData } from "@/pages/admin/schema";
import sendRequest from "../send-request";
import { ApiRoutes, getApiUrl } from "../routes";

export const registerParty = async (data: AdminLoginRegisterFormData) => {
  const response = await sendRequest(getApiUrl(ApiRoutes.REGISTER_PARTY), {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
