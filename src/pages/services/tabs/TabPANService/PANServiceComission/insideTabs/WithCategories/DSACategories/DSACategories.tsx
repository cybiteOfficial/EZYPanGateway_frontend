import React from "react";
import { useSelector } from "react-redux";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import { RootState } from "src/redux/store";

type Props = {
  columns: any[];
  rows: any[];
};

const DSACategories = ({ columns, rows }: Props) => {
  const panCommissionState: any = useSelector(
    (state: RootState) => state.panCommission
  );
  const { isTableLoading } = panCommissionState;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <div className="border flex flex-col overflow-auto rounded bg-white">
        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white ">
          <ATMTable
            columns={columns}
            rows={rows}
            isLoading={isTableLoading}
            rowExtraClasses={() => "min-h-[30px]"}
          />
        </div>
      </div>
    </div>
  );
};

export default DSACategories;
