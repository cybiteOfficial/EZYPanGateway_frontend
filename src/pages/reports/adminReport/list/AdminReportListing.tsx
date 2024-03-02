import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setSearchValue,
} from "src/redux/slices/Report/AdminReportSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import FilterCardWrapper from "../ReportFilterCard/FilterCardWrapper";
import ATMExportButton from "src/components/UI/atoms/ATMExportButton/ATMExportButton";
import { useExportReportsMutation } from "src/services/AdminServices";
import { showToast } from "src/utils/toaster/showToast";
import { ReportListResponse } from "src/models/Report.model";
import ReportTable from "../../ReportTable/ReportTable";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {};

const AdminReportListing = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const reportState = useSelector((state: RootState) => state.adminReport);
  const {
    page,
    rowsPerPage,
    totalItems,
    items,
    searchValue,
    dateFilter,
    isTableLoading,
  } = reportState;

  const [exportData, setExportData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportReport] = useExportReportsMutation();

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Report",
      icon: RxDashboard,
    },
  ];

  // Export Data Headers
  const headers = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "PAN - Generate",
      key: "panGenerate",
    },
    {
      label: "PAN - Verify",
      key: "panVerified",
    },
    {
      label: "PAN - Reject",
      key: "panRejected",
    },
    {
      label: "PAN - Done",
      key: "panDone",
    },
    {
      label: "ITR - Generate",
      key: "itrGenerate",
    },
    {
      label: "ITR - Verify",
      key: "itrVerified",
    },
    {
      label: "ITR - Reject",
      key: "itrRejected",
    },
    {
      label: "ITR - Done",
      key: "itrDone",
    },
    {
      label: "Gumasta - Generate",
      key: "gumastaGenerate",
    },
    {
      label: "Gumasta - Verify",
      key: "gumastaVerified",
    },
    {
      label: "Gumasta - Reject",
      key: "gumastaRejected",
    },
    {
      label: "Gumasta - Done",
      key: "gumastaDone",
    },
    {
      label: "DSC - Generate",
      key: "dscGenerate",
    },
    {
      label: "DSC - Verify",
      key: "dscVerified",
    },
    {
      label: "DSC - Reject",
      key: "dscRejected",
    },
    {
      label: "DSC - Done",
      key: "dscDone",
    },
    {
      label: "MSME - Generate",
      key: "msmeGenerate",
    },
    {
      label: "MSME - Verify",
      key: "msmeVerified",
    },
    {
      label: "MSME - Reject",
      key: "msmeRejected",
    },
    {
      label: "MSME - Done",
      key: "msmeDone",
    },
  ];

  // Handle Export
  const handleExport = (done: () => void) => {
    setIsExporting(true);

    exportReport({
      limit: 10,
      searchValue: searchValue,
      params: ["_id", "userName", "createdAt", "updatedAt"],
      page: 1,
      filterBy: [
        {
          fieldName: "",
          value: [],
        },
      ],
      orderBy: "createdAt",
      orderByValue: -1,
      dateFilter: dateFilter,
      isPaginationRequired: false,
    }).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
        setIsExporting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", "Exported successfully");
          setExportData(
            res?.data?.data?.map((report: ReportListResponse) => {
              return {
                ...report,
                name: report.adminName,

                panGenerate: report?.pan?.generate,
                panVerified: report?.pan?.verified,
                panRejected: report?.pan?.rejected,
                panDone: report?.pan?.done,

                itrGenerate: report?.itr?.generate,
                itrVerified: report?.itr?.verified,
                itrRejected: report?.itr?.rejected,
                itrDone: report?.itr?.done,

                gumastaGenerate: report?.gumasta?.generate,
                gumastaVerified: report?.gumasta?.verified,
                gumastaRejected: report?.gumasta?.rejected,
                gumastaDone: report?.gumasta?.done,

                dscGenerate: report?.dsc?.generate,
                dscVerified: report?.dsc?.verified,
                dscRejected: report?.dsc?.rejected,
                dscDone: report?.dsc?.done,

                msmeGenerate: report?.msme?.generate,
                msmeVerified: report?.msme?.verified,
                msmeRejected: report?.msme?.rejected,
                msmeDone: report?.msme?.done,
              };
            })
          );
          setIsExporting(false);

          done();
        } else {
          showToast("error", res?.data?.message);
          setIsExporting(false);
        }
      }
    });
  };

  return (
    <AuthHOC
      moduleName="ADMINS"
      action={AccessAction.ADMIN_REPORTS}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        <div className="border flex flex-col overflow-y-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            renderFilter={(close) => <FilterCardWrapper onClose={close} />}
            rows={items}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
            isFilter
            hidePagination
            searchValue={searchValue}
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          />

          <div className="flex justify-end py-2">
            <ATMExportButton
              data={exportData}
              headers={headers}
              fileName="admin-report.csv"
              isLoading={isExporting}
              onClick={handleExport}
            />
          </div>

          {/* Table */}
          <div className="border flex flex-col grow overflow-y-auto rounded bg-white">
            <ReportTable reportData={items} isTableLoading={isTableLoading} />
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default AdminReportListing;
