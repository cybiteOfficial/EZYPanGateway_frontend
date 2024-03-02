import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitialStateType = {
  isCollapsed: boolean;
};

const initialState: InitialStateType = {
  isCollapsed: false,
};

const sideNavLayoutSlice: any = createSlice({
  name: "sideNavLayout",
  initialState,
  reducers: {
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { setIsCollapsed } = sideNavLayoutSlice.actions;
export default sideNavLayoutSlice.reducer;
