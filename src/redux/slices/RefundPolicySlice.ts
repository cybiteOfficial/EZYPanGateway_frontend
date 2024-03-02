import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RefundPolicyListResponse } from "src/models/RefundPolicy.model";

export interface RefundPolicySliceType {
  items: RefundPolicyListResponse[] | [];
  isTableLoading: boolean;
}

const initialState: RefundPolicySliceType = {
  items: [],
  isTableLoading: false,
};

const refundPolicySlice: any = createSlice({
  name: "refundPolicy",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setItems: (
      state,
      action: PayloadAction<RefundPolicyListResponse[] | []>
    ) => {
      state.items = action.payload;
    },

    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
  },
});

export const { setItems, setIsTableLoading } = refundPolicySlice.actions;
export default refundPolicySlice.reducer;
