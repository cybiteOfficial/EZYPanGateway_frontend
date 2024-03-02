import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
} from "src/redux/slices/NewRegistartionRewardSlice";
import { AppDispatch, RootState } from "src/redux/store";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
};

const NewRegistratiRewardListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const newRegistrationRewardState: any = useSelector(
    (state: RootState) => state.newRegistrationReward
  );
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { page, rowsPerPage, isTableLoading, totalItems } =
    newRegistrationRewardState;

  return (
    <AuthHOC moduleName="RETAILER_REGISTER_REWARDS" alt={<NotAuthorizedPage/>} action = {AccessAction.LIST}>
       <div className="flex flex-col gap-2 py-3 h-full">
      <div className="border flex flex-col overflow-auto rounded bg-white">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          isSearchVisible={false}
          onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
        />

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white ">
          <ATMTable
            columns={columns}
            rows={rows}
            isLoading={isTableLoading}
            rowExtraClasses={() => "min-h-[30px]"}
          />
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
    </div>

    </AuthHOC>
   
  );
};

export default NewRegistratiRewardListing;
