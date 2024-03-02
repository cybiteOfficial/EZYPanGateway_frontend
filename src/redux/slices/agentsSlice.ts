import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AgentsListResponse,
  DistributorListResponse,
} from "src/models/Agents.model";

export interface AgentsSliceStateType {
  items: AgentsListResponse[] | [];
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  selectedAgentId: string;
  selectedAgent: DistributorListResponse | null;
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
}

const initialState: AgentsSliceStateType = {
  items: [],
  totalItems: 0,
  isTableLoading: false,
  page: 1,
  rowsPerPage: 10,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  selectedAgentId: "",
  selectedAgent: null,
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
};

const agentsSlice: any = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<AgentsListResponse[] | []>) => {
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
    setSelectedAgentId: (state, action: PayloadAction<string>) => {
      state.selectedAgentId = action.payload;
    },
    setSelectedAgent: (
      state,
      action: PayloadAction<DistributorListResponse>
    ) => {
      state.selectedAgent = action.payload;
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
  setSelectedAgentId,
  setSelectedAgent,
  setDateFilter,
  setFilterBy
} = agentsSlice.actions;
export default agentsSlice.reducer;
