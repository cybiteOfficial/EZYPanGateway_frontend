import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoanEnquiryListResponse } from "src/models/LoanEnquiry.model";

export interface LoanEnquirySliceStateType {
  items: LoanEnquiryListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedLoanEnquiryId: string;
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
}

const initialState: LoanEnquirySliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedLoanEnquiryId: "",
  dateFilter: {
    start_date: "",
    end_date: "",
  },
};

const loanEnquirySlice: any = createSlice({
  name: "loanEnquiry",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<LoanEnquiryListResponse[] | []>
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
    setSelectedLoanEnquiryId: (state, action: PayloadAction<string>) => {
      state.selectedLoanEnquiryId = action.payload;
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
  setDateFilter,
  setSortValue,
  setTotalItems,
  setIsTableLoading,
  setSelectedLoanEnquiryId,
} = loanEnquirySlice.actions;
export default loanEnquirySlice.reducer;
