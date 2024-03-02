import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, { BreadcrumbType } from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { setRowsPerPage, setPage } from "src/redux/slices/userAccessSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

type Props = {
  columns: any[];
  rows: any[];
};

const UserAccessListing = ({ columns, rows }: Props) => {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const userAccesstate: any = useSelector((state: RootState) => state.userAccess);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { page, rowsPerPage } = userAccesstate;
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Admin",
      path: "/admin",
      icon: IoPersonCircleOutline,
    },
    {
      label: "User Access",
      icon: RxDashboard,
    },
  ];

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">

      {/* Breadcrumbs */}
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

      {/* Page Header */}
      <div className="flex justify-end items-end gap-2">
        <button 
        onClick={()=> navigate('add')}
        className='border bg-secondary-main items-center rounded  text-white flex mt-1 py-1 px-4 hover:bg-orange-600 ' >
          Add new user
        </button>
      </div>
      <div className="border flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={rows.length}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
          isFilter
        //     // onFilterClick={() => setIsFilterOpen(true)}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <ATMTable columns={columns} rows={rows}
            isCheckbox={true}
            selectedRows={selectedRows}
            onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
            extraClasses='max-h-[calc(100%-150px)]' />         </div>

        {/* Pagination */}
        <div className="flex items-center text-md justify-end border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={rows.length}
            rows={rows}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
          />
        </div>
      </div>

      {/* {isFilterOpen && (
 <FilterDialogWarpper
 onClose={()=> setIsFilterOpen(false)}
 />
)} */}
    </div>

  );
};

export default UserAccessListing;
