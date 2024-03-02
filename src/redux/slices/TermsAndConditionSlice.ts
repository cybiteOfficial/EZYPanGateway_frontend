import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TermsAndConditionListResponse } from "src/models/TermsAndCondition.model";

export interface TermsAndConditionsSliceType {
  items: TermsAndConditionListResponse[]  | [];
  isTableLoading: boolean;
 
}

const initialState: TermsAndConditionsSliceType = {
  items: [],
  isTableLoading: false,
 
};

const termsAndConditionSlice: any = createSlice({
  name: "tabRetailerPanApplication",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setItems: (state, action: PayloadAction<TermsAndConditionListResponse[] | []>) => {
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
 
} = termsAndConditionSlice.actions;
export default termsAndConditionSlice.reducer;
