import React from "react";
import { useSelector } from "react-redux";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import { RootState } from "src/redux/store";

type Props = {
  columns: any[];
  rows: any[];
};

const PANServiceCategoriesListing = ({ columns, rows }: Props) => {
  const panCategoryState: any = useSelector(
    (state: RootState) => state.panCategory
  );
  const { isTableLoading } = panCategoryState;
  return (
   
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        <div className="pt-2"></div>
        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              isLoading={isTableLoading}
              columns={columns}
              rows={rows}
            />{" "}
          </div>
        </div>
      </div>
  );
};

export default PANServiceCategoriesListing;
