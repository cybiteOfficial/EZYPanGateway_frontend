import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RewardListResponse } from "src/models/Reward.model";

export interface RewardSliceStateType {
    items: RewardListResponse[] | [],
    totalItems: number,
    isTableLoading: boolean,
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortValue: { field: string; value: 'DESC' | 'ASC' },
    selectedRewardId: string ,
    dateFilter: {
        start_date: string | null;
        end_date: string | null;
      };
}

const initialState: RewardSliceStateType = {
    items: [],
    totalItems: 0,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: "",
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedRewardId: "",
    dateFilter: {
        start_date: "",
        end_date: "",
      },
}

const rewardSlice: any = createSlice({
    name: 'reward',
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
            state.selectedRewardId = action.payload
        } ,
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
    setSelectedRewardId ,
    setDateFilter
} = rewardSlice.actions
export default rewardSlice.reducer
