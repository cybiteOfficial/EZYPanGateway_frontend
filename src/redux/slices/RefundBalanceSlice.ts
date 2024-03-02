import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RefundBalanceListResponse } from "src/models/LedgerRefundBalance.model";

export interface RefundBalanceSliceStateType {
    items: RefundBalanceListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedRefundBalanceId: string,
    dateFilter: {
        month: string | null;
        year: string | null;
      };
}

const initialState: RefundBalanceSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedRefundBalanceId: "",
    dateFilter: {
        month: "",
        year: "",
      },
}

const refundBalanceSlice: any = createSlice({
    name: 'refundBalance',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<RefundBalanceListResponse[] | []>) => {
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
        setSelectedRefundBalanceId: (state, action: PayloadAction<string>) => {
            state.selectedRefundBalanceId = action.payload
        },
        setDateFilter: (
            state,
            action: PayloadAction<{ month: string; year: string }>
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
    setSelectedRefundBalanceId ,
    setDateFilter
} = refundBalanceSlice.actions
export default refundBalanceSlice.reducer
