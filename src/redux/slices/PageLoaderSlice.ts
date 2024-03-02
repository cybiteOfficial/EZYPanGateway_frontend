import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitialStateType = {
  isOpen: boolean;
};

const initialState: InitialStateType = {
  isOpen: false,
};

const pageLoaderSlice: any = createSlice({
  name: "pageLoader",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = pageLoaderSlice.actions;
export default pageLoaderSlice.reducer;
