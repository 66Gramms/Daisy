import { PartyRegisterFormData } from "@/pages/admin/schema";
import { ApiRoutes, getApiUrl } from "@/services/api/routes";
import sendRequest from "@/services/api/send-request";
import { partyResponse, registerPartyResponse } from "@/services/api/admin/party/types";

export const getParty = async () => {
  const response = await sendRequest<partyResponse>(
    getApiUrl(ApiRoutes.HAS_PARTY),
  );
  return response;
};

export const registerParty = async (data: PartyRegisterFormData) => {
  const response = await sendRequest<registerPartyResponse>(
    getApiUrl(ApiRoutes.REGISTER_PARTY),
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  return response;
};
