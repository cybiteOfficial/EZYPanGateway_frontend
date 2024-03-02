import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import { RootState } from "src/redux/store";
import {
  setRowsPerPage,
  setPage,
} from "src/redux/slices/MSMEServiceRewardSlice";

type Props = {
  columns: any[];
  rows: any[];
};
const MSMEServiceRewardListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch();

  const statePagesState: any = useSelector(
    (state: RootState) => state.MSMEServiceReward
  );
  const { rowsPerPage,  page, totalItems, isTableLoading } =
    statePagesState;
  return (
    <div>
      <div className="flex flex-col gap-2 py-3 h-full">
        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            isSearchVisible={false}
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
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
    </div>
  );
};

export default MSMEServiceRewardListing;
