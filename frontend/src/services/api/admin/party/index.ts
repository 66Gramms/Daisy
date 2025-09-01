import { ApiRoutes, getApiUrl } from "../../routes";
import sendRequest from "../../send-request";
import { hasPartyResponse } from "./types";

export const getHasParty = async () => {
  const response = await sendRequest<hasPartyResponse>(
    getApiUrl(ApiRoutes.HAS_PARTY),
  );
  return response;
};
