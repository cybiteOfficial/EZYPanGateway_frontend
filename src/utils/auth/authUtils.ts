import { authTokenKeyName, refreshTokenKeyName } from "../configs/AuthConfig";

export const clearLocalStorage = () => {
  localStorage.removeItem(authTokenKeyName);
  localStorage.removeItem(refreshTokenKeyName);
  localStorage.removeItem("userData");
};
