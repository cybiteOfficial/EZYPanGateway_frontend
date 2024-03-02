import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/BusinessEnquirySlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import FilterCardWrapper from "./BusinessEnquiryFilterCard/FilterCardWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  columns: any[];
  rows: any[];
  onExport: (done: () => void, isAllExport: boolean) => void;
  isAllExporting: boolean;
  exportDataHeaders: any;
  exportData: any;
  isCurrentExporting: boolean;
};

const BusinessEnquiryListing = ({
  columns,
  rows,
  onExport,
  exportDataHeaders,
  exportData,
  isAllExporting,
  isCurrentExporting,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const businessEnquiryState: any = useSelector(
    (state: RootState) => state.businessEnquiry
  );

  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    businessEnquiryState;
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Business Enquiry",
      icon: FiUser,
    },
  ];

  return (
    <AuthHOC
      moduleName="BUSINESS_ENQUIRIES"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC moduleName="BUSINESS_ENQUIRIES" action={AccessAction.EXPORT}>
            <ATMExportButtonGroup
              isAllExporting={isAllExporting}
              isCurrentExporting={isCurrentExporting}
              onExport={onExport}
              allExportFileName="all-business-enquiry.csv"
              currentExportFileName="current-business-enquiry.csv"
              exportDataHeaders={exportDataHeaders}
              exportData={exportData}
            />
          </AuthHOC>
        </div>

        <div className="border flex flex-col overflow-auto rounded bg-white ">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            renderFilter={(close) => <FilterCardWrapper close={close} />}
            searchValue={searchValue}
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
            isFilter
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
          <div className="flex items-center justify-end border-t border-slate-300">
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

export default BusinessEnquiryListing;
