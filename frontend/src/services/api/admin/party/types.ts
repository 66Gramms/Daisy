import { AccessRights } from "@/constants/common";

export interface PartyResponse {
  name: string;
}

export interface RegisterPartyResponse {
  token: string;
  username: string;
  accessRights: AccessRights;
}
