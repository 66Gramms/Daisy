import { AccessRights } from "@/constants/common";

export interface hasPartyResponse {
  hasParty: boolean;
}

export interface registerPartyResponse {
  token: string;
  username: string;
  accessRights: AccessRights;
}
