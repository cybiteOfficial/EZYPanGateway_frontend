import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitialStateType = {
    expandedIndex: number;
};

const initialState: InitialStateType = {
    expandedIndex: -1,
};

const verticalNavBarSlice: any = createSlice({
  name: "verticalNavBar",
  initialState,
  reducers: {
    setExpandedIndex: (state, action: PayloadAction<number>) => {
      state.expandedIndex = action.payload;
    },
  },
});

export const { setExpandedIndex } = verticalNavBarSlice.actions;
export default verticalNavBarSlice.reducer;
