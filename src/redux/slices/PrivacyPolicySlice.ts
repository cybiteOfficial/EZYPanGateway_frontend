import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivacyAndPolicyListResponse } from "src/models/PrivacyAndPolicy.model";

export interface  PrivacyAndPolicySliceType {
  items: PrivacyAndPolicyListResponse[]  | [];
  isTableLoading: boolean;
 
}

const initialState:  PrivacyAndPolicySliceType = {
  items: [],
  isTableLoading: false,
 
};

const privacyAndPolicySlice: any = createSlice({
  name: "privacyPolicy",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setItems: (state, action: PayloadAction<PrivacyAndPolicyListResponse[] | []>) => {
      state.items = action.payload;
    },
    
    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
   
  },
});

export const {
  setItems,
  setIsTableLoading,
 
} = privacyAndPolicySlice.actions;
export default privacyAndPolicySlice.reducer;
