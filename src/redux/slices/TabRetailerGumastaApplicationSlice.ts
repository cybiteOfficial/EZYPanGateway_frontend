import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GumastaListResponse } from "src/models/Gumasta.model";

export interface TabRetailerGumastaApplicationSliceType {
  items: GumastaListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedPANId: string;
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
}

const initialState: TabRetailerGumastaApplicationSliceType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedPANId: "",
  filterBy: [
    {
      fieldName: "status",
      value: [],
    },
    {
      fieldName: "appliedByNumber",
      value: [],
    },
  ],
  dateFilter: {
    start_date: "",
    end_date: "",
  },
};

const tabRetailerGumastaApplicationSlice: any = createSlice({
  name: "tabRetailerGumastaApplication",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setItems: (state, action: PayloadAction<GumastaListResponse[] | []>) => {
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
    setSelectedPANId: (state, action: PayloadAction<string>) => {
      state.selectedPANId = action.payload;
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
  setSelectedPANId,
  setFilterBy,
  setDateFilter,
  resetState,
} = tabRetailerGumastaApplicationSlice.actions;
export default tabRetailerGumastaApplicationSlice.reducer;