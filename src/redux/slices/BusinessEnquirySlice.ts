import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BusinessEnquiryListResponse } from "src/models/BusinessEnquiry.model";

export interface BusinessEnquirySliceStateType {
  items: BusinessEnquiryListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedBusinessEnquiryId: string;
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
}

const initialState: BusinessEnquirySliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedBusinessEnquiryId: "",
  dateFilter: {
    start_date: "",
    end_date: "",
  },
};

const businessEnquirySlice: any = createSlice({
  name: "businessEnquiry",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<BusinessEnquiryListResponse[] | []>
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
    setSelectedBusinessEnquiryId: (state, action: PayloadAction<string>) => {
      state.selectedBusinessEnquiryId = action.payload;
    },
    setDateFilter: (
      state,
      action: PayloadAction<{ start_date: string; end_date: string }>
    ) => {
      state.dateFilter = action.payload;
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
  setDateFilter,
  setIsTableLoading,
  setSelectedBusinessEnquiryId,
} = businessEnquirySlice.actions;
export default businessEnquirySlice.reducer;
