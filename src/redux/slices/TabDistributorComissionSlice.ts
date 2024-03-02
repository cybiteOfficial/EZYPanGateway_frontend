import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { CommissionListResponse } from "src/models/Commission.model";

export interface TabDistributorCommissionSliceStateType {
    items: CommissionListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedTabDistributorCommissionId: string
    filterBy: {
        fieldName: string;
        value: string[];
      }[];
      dateFilter: {
        month: string | null;
        year: string | null;
      };
}

const initialState: TabDistributorCommissionSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedTabDistributorCommissionId: "",
    filterBy: [
        {
          fieldName: "appliedById",
          value: [],
        },
      ],
      dateFilter: {
        month: "",
        year: "",
      },
}

const tabDistributorCommissionSlice: Slice<TabDistributorCommissionSliceStateType> = createSlice({
    name: 'tabDistributorCommission',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<CommissionListResponse[] | []>) => {
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
        setSelectedTabDistributorCommissionId: (state, action: PayloadAction<string>) => {
            state.selectedTabDistributorCommissionId = action.payload
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
    setFilterBy,
    setDateFilter,
    setIsTableLoading,
    setSelectedTabDistributorCommissionId
} = tabDistributorCommissionSlice.actions
export default tabDistributorCommissionSlice.reducer
