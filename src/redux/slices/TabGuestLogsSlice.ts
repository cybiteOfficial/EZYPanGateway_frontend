import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LogListResponse } from "src/models/Log.model";

export interface TabGuestLogsSliceStateType {
  items: LogListResponse[] | [];
  totalItems: number | null;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedDSCId: string;
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
  dateFilter: {
    start_date: string;
    end_date: string;
  };
}

const initialState: TabGuestLogsSliceStateType = {
  items: [],
  totalItems: null,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedDSCId: "",
  filterBy: [
    {
      fieldName: "userId",
      value: [],
    },
  ],
  dateFilter: {
    start_date: '',
    end_date: '',
  },
};

const tabGuestLogsSlice: Slice<TabGuestLogsSliceStateType> = createSlice({
  name: "tabGuestLogs",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<LogListResponse[] | []>) => {
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
    setTotalItems: (state, action: PayloadAction<number | null>) => {
      state.totalItems = action.payload;
    },
    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
    setSelectedDSCId: (state, action: PayloadAction<string>) => {
      state.selectedDSCId = action.payload;
    },
    setFilterBy: (
      state,
      action: PayloadAction<{ fieldName: string; value: string[] }[]>
    ) => {
      state.filterBy = action.payload;
      state.page = 1;
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
  setSelectedDSCId,
  setDateFilter,
  setFilterBy,
} = tabGuestLogsSlice.actions;
export default tabGuestLogsSlice.reducer;
