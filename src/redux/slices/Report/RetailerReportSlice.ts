import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReportListResponse } from "src/models/Report.model";

export interface RetailerReportSliceStateType {
  items: ReportListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  dateFilter: {
    start_date: string;
    end_date: string;
  };
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedReportId: string;
}

const initialState: RetailerReportSliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  dateFilter: {
    start_date: "",
    end_date: "",
  },
  sortValue: { field: "createdAt", value: "DESC" },
  selectedReportId: "",
};

const reportReportSlice: Slice<RetailerReportSliceStateType> = createSlice({
  name: "reportReport",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ReportListResponse[] | []>) => {
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
    setSelectedReportId: (state, action: PayloadAction<string>) => {
      state.selectedReportId = action.payload;
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
  setIsTableLoading,
  setSelectedReportId,
  setDateFilter,
} = reportReportSlice.actions;
export default reportReportSlice.reducer;
