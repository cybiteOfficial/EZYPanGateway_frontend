import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MSMEListResponse } from "src/models/MSME.model";

export interface MSMESliceStateType {
  items: MSMEListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedMSMEId: string;
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
}

const initialState: MSMESliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedMSMEId: "",
  filterBy: [
    {
      fieldName: "status",
      value: [],
    },
    {
      fieldName: "distributorCode",
      value: [],
    },
  ],
  dateFilter: {
    start_date: "",
    end_date: "",
  },
};

const msmeSlice: any = createSlice({
  name: "msme",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setItems: (state, action: PayloadAction<MSMEListResponse[] | []>) => {
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
    setSelectedMSMEId: (state, action: PayloadAction<string>) => {
      state.selectedMSMEId = action.payload;
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
  resetState,
  setSortValue,
  setTotalItems,
  setIsTableLoading,
  setDateFilter,
  setSelectedMSMEId,
  setFilterBy,
} = msmeSlice.actions;
export default msmeSlice.reducer;
