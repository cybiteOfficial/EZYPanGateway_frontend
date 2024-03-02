import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PANCategoriesListResponse } from "src/models/PANCategories.model";

export interface PanCategorySliceStateType {
  items :PANCategoriesListResponse []|[],
  isTableLoading :boolean
}
const initialState : PanCategorySliceStateType = {
  items : [],
  isTableLoading  :false
}

const panCategorySlice :any = createSlice({
  name: "panCategory",
  initialState,
  reducers: {
    setItems :(state ,action :PayloadAction<PANCategoriesListResponse [] | []> )=>{
      state.items =action.payload;
    },
    setIsTableLoading :(state,action :PayloadAction <boolean>)=>{
      state.isTableLoading= action.payload;
    }    
  }
})
export const {setItems ,setIsTableLoading} = panCategorySlice.actions
export default panCategorySlice.reducer