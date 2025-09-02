export enum ApiRoutes {
  HAS_PARTY = "/admin/party/has-party",
  REGISTER_PARTY = "/admin/party/register-party",
  ADMIN_LOGIN = "/admin/login",
}

export const getApiUrl = (route: ApiRoutes) => {
  return `${route}`;
};
