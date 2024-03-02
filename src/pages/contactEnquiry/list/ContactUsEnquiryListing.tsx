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
} from "src/redux/slices/ContactUsEnquirySlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import ATMExportButtonGroup from "src/components/UI/atoms/ATMExportButtonGroup/ATMExportButtonGroup";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";
import FilterCardWrapper from "./ContactUsEnquiryFilterCard/FilterCardWrapper";
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

const ContactUsEnquiryListing = ({
  columns,
  rows,
  onExport,
  exportDataHeaders,
  exportData,
  isAllExporting,
  isCurrentExporting,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const contactUsEnquiryState: any = useSelector(
    (state: RootState) => state.contactUsEnquiry
  );

  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    contactUsEnquiryState;
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Admin",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Contact Us Enquiry",
      icon: FiUser,
    },
  ];

  return (
    <AuthHOC
      moduleName="CONTACT_US_ENQUIRIES"
      alt={<NotAuthorizedPage />}
      action={AccessAction.LIST}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC moduleName="CONTACT_US_ENQUIRIES" action={AccessAction.EXPORT}>
            <ATMExportButtonGroup
              isAllExporting={isAllExporting}
              isCurrentExporting={isCurrentExporting}
              onExport={onExport}
              allExportFileName="all-contact-us-enquiry.csv"
              currentExportFileName="current-contact-us-enquiry.csv"
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

        {/* {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
      </div>
    </AuthHOC>
  );
};

export default ContactUsEnquiryListing;
