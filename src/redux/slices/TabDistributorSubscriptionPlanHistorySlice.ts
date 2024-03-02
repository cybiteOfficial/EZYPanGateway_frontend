import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DistributorSubscriptionListResponse } from "src/models/Subscription.model";

export interface TabDistributorSubscriptionPlanHistorySliceStateType {
  items: DistributorSubscriptionListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedDistributorSubscriptionPlanHistoryId: string;
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
}

const initialState: TabDistributorSubscriptionPlanHistorySliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedDistributorSubscriptionPlanHistoryId: "",
  filterBy: [
    {
      fieldName: "mobileNumber",
      value: [],
    },
  ],
};

const TabDistributorSubscriptionPlanHistorySlice: any = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<DistributorSubscriptionListResponse[] | []>) => {
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
    setSelectedDistributorSubscriptionPlanHistoryId: (state, action: PayloadAction<string>) => {
      state.selectedDistributorSubscriptionPlanHistoryId = action.payload;
    },
    setFilterBy: (
      state,
      action: PayloadAction<{ fieldName: string; value: string[] }[]>
    ) => {
      
      state.filterBy = action.payload;
      state.page = 1;
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
  setSelectedDistributorSubscriptionPlanHistoryId,
  setFilterBy,
} = TabDistributorSubscriptionPlanHistorySlice.actions;
export default TabDistributorSubscriptionPlanHistorySlice.reducer;
