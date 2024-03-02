import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "src/utils/configs/AuthConfig";

export interface AuthSLiceStateType {
  accessToken: string | null;
  refreshToken: string | null;
  userAccess: string | null;
}

const initialState: AuthSLiceStateType = {
  accessToken: localStorage.getItem(authTokenKeyName) || null,
  refreshToken: localStorage.getItem(refreshTokenKeyName) || null,
  userAccess: null,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },

    resetState: () => {
      return initialState;
    },
    setUserAccess: (state, action: PayloadAction<string | null>) => {
      state.userAccess = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, resetState,setUserAccess } =
  authSlice.actions;
export default authSlice.reducer;
