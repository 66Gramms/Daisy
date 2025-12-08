import { AccessRights } from "@/constants/common";

export interface partyResponse {
  name: string;
}

export interface registerPartyResponse {
  token: string;
  username: string;
  accessRights: AccessRights;
}
