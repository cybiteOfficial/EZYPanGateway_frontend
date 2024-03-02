import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NewRegistrationRewardListResponse } from "src/models/NewRegistartionReward.model";

export interface NewRegistartionRewardSliceStateType {
  items: NewRegistrationRewardListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedNewRegistrationRewardId: string;
}

const initialState: NewRegistartionRewardSliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedNewRegistrationRewardId: "",
};

const newRegistrationRewardSlice: any = createSlice({
  name: "newRegistrationReward",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<NewRegistrationRewardListResponse[] | []>
    ) => {
      state.items = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.page = 1;
    },
    setSortValue: (
      state,
      action: PayloadAction<{ field: string; value: "DESC" | "ASC" }>
    ) => {
      state.sortValue = action.payload;
      state.page = 1;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
    setSelectedNewRegistrationRewardId: (
      state,
      action: PayloadAction<string>
    ) => {
      state.selectedNewRegistrationRewardId = action.payload;
    },
  },
});

export const {
  setItems,
  setPage,
  setRowsPerPage,
  setSearchValue,
  setSortValue,
  setTotalItems,
  setIsTableLoading,
  setSelectedNewRegistrationRewardId,
} = newRegistrationRewardSlice.actions;
export default newRegistrationRewardSlice.reducer;
