import { AccessRights } from "@/constants/common";

export interface AdminLoginResponse {
  username: string;
  token: string;
  accessRights: AccessRights;
}
