import { PartyRegisterFormData } from "@/pages/admin/schema";
import { ApiRoutes, getApiUrl } from "../../routes";
import sendRequest from "../../send-request";
import { hasPartyResponse, registerPartyResponse } from "./types";

export const getHasParty = async () => {
  const response = await sendRequest<hasPartyResponse>(
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
