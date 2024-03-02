import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { ContactUsEnquiryListResponse } from "src/models/ContactUsEnquiry.model";

export interface ContactUsSliceStateType {
    items: ContactUsEnquiryListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedContactUSId: string;
    dateFilter: {
        start_date: string | null;
        end_date: string | null;
      };
}

const initialState: ContactUsSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedContactUSId: "",
    dateFilter: {
        start_date: "",
        end_date: "",
      },
}

const contactUsEnquirySlice: any = createSlice({
  name: "contactUsEnquiry",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<ContactUsEnquiryListResponse[] | []>
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
    setSelectedContactUSId: (state, action: PayloadAction<string>) => {
      state.selectedContactUSId = action.payload;
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
    setDateFilter,
    setTotalItems,
    setIsTableLoading,
    setSelectedContactUSId
} = contactUsEnquirySlice.actions
export default contactUsEnquirySlice.reducer
