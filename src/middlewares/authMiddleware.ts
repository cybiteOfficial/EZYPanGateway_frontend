import { apiSlice } from "src/services/ApiSlice";
import { clearLocalStorage } from "src/utils/auth/authUtils";
import { authTokenKeyName } from "src/utils/configs/AuthConfig";

const apiSliceType: any = apiSlice;
export const authMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  if (result.error && result.payload.status === 401) {
    store
      .dispatch(
        apiSliceType.endpoints.getAccessToken.initiate(
          localStorage.getItem("refresh_token")
        )
      )
      .then((res: any) => {
        if (res?.error && res?.error?.status === 401) {
          clearLocalStorage();
          window.location.replace("/login");
        } else {
          localStorage.setItem(authTokenKeyName, res.data?.token.accessToken);
          localStorage.setItem("refresh_token", res.data?.token.refreshToken);
          localStorage.setItem("userData", JSON.stringify(res.data?.data));
        }
      });
  }
  return result;
};
