import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RetailerListResponse } from "src/models/Retailer.model";

export interface RetailerSliceStateType {
    items: RetailerListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedSubAgentId: string,
    dateFilter: {
        start_date: string | null;
        end_date: string | null;
      };
}

const initialState: RetailerSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedSubAgentId: "",
    dateFilter: {
        start_date: "",
        end_date: "",
      },
}

const retailerSlice: any = createSlice({
    name: 'retailer',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<RetailerListResponse[] | []>) => {
            state.items = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
            state.page = 1;
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
            state.page = 1;
        },
        setSortValue: (state, action: PayloadAction<{ field: string; value: 'DESC' | 'ASC' }>) => {
            state.sortValue = action.payload;
            state.page = 1;
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        setIsTableLoading: (state, action: PayloadAction<boolean>) => {
            state.isTableLoading = action.payload
        },
        setSelectedSubAgentId: (state, action: PayloadAction<string>) => {
            state.selectedSubAgentId = action.payload
        },
        setDateFilter: (
            state,
            action: PayloadAction<{  start_date: string; end_date: string  }>
          ) => {
            state.dateFilter = action.payload;
          },

    }
})

export const {
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setSortValue,
    setTotalItems,
    setIsTableLoading,
    setSelectedSubAgentId ,
    setDateFilter
} = retailerSlice.actions
export default retailerSlice.reducer
