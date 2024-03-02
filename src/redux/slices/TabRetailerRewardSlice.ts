import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RewardListResponse } from "src/models/Reward.model";

export interface TabRetailerRewardSliceStateType {
    items: RewardListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedTabRetailerRewardId: string,
    filterBy: {
        fieldName: string;
        value: string[];
      }[];
      dateFilter: {
        start_date: string;
        end_date: string;
      };
}

const initialState: TabRetailerRewardSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedTabRetailerRewardId: "",
    filterBy: [
        {
          fieldName: "userId",
          value: [],
        },
      ],
      dateFilter: {
        start_date: "",
        end_date: "",
      },
}

const tabRetailerRewardSlice: Slice<TabRetailerRewardSliceStateType>= createSlice({
    name: 'tabRetailerReward',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<RewardListResponse[] | []>) => {
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
        setSelectedRewardId: (state, action: PayloadAction<string>) => {
            state.selectedTabRetailerRewardId = action.payload
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
    setSelectedTabRetailerRewardId
} = tabRetailerRewardSlice.actions
export default tabRetailerRewardSlice.reducer
