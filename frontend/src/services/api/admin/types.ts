import { AccessRights } from "@/constants/common";

export interface adminLoginResponse {
  username: string;
  token: string;
  accessRights: AccessRights;
}
