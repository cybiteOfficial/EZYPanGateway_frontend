import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/GumastaConfigState";
import { AppDispatch, RootState } from "src/redux/store";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import AddStateWrapper from "../add/AddStateWrapper";
type Props = {
  columns: any[];
  rows: any[];
};

const StateList = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openAddDialog , setAddOpenDialog] = useState(false)
  const rejectionListState: any = useSelector(
    (state: RootState) => state.gumastaConfigState
  );
  const { page, rowsPerPage, searchValue, isTableLoading, totalItems } =
    rejectionListState;

  
  return (
  <div>
      <div className="flex justify-end items-end gap-2">
        {/* Page Header */}
      
        <ATMLoadingButton className="my-2" onClick={() => setAddOpenDialog(true)}>
          Add State
        </ATMLoadingButton>
    </div>
    <div className="border flex flex-col overflow-auto rounded bg-white">
      {/*Table Header */}
      <ATMTableHeader
        page={page}
        rowCount={totalItems}
        rowsPerPage={rowsPerPage}
        rows={rows}
        onRowsPerPageChange={(newValue) =>
          dispatch(setRowsPerPage(newValue))
        }
        searchValue={searchValue}
        onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
      />

      {/* Table */}
      <div className="border flex flex-col grow overflow-auto rounded bg-white">
        <ATMTable
          columns={columns}
          rows={rows}
          isLoading={isTableLoading}
        />{" "}
      </div>

      {/* Pagination */}
      <div className="flex items-center text-md justify-end border-t border-slate-300">
        <ATMPagination
          page={page}
          rowCount={totalItems}
          rows={rows}
          rowsPerPage={rowsPerPage}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
        />
      </div>
    </div>
    {openAddDialog && <AddStateWrapper onClose={()=>{setAddOpenDialog(false)}}/>  }
  </div>
        
    
  );
};

export default StateList;
