import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RefundRequestListResponse } from "src/models/RefundRequest.model";

export interface RefundRequestSliceStateType {
    items: RefundRequestListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedRefundRequestId: string,
    filterBy: {
        fieldName: string;
        value: string[];
      }[];
      dateFilter: {
        start_date: string;
        end_date: string;
      };
}

const initialState: RefundRequestSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedRefundRequestId: "",
    filterBy: [
        {
          fieldName: "status",
          value: [],
        },
      ],
      dateFilter: {
        start_date: "",
        end_date: "",
      },
}

const refundRequestSlice: Slice<RefundRequestSliceStateType> = createSlice({
    name: 'refundRequest',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<RefundRequestListResponse[] | []>) => {
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
        setSelectedRefundRequestId: (state, action: PayloadAction<string>) => {
            state.selectedRefundRequestId = action.payload
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

    }
})

export const {
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setSortValue,
    setTotalItems,
    setFilterBy,
    setDateFilter,
    setIsTableLoading,
    setSelectedRefundRequestId
} = refundRequestSlice.actions
export default refundRequestSlice.reducer
