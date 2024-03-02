import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/GuestSlice";
import { AppDispatch, RootState } from "src/redux/store";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GuestListResponse } from "src/models/Guest.model";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { switchToAuthModule } from "src/utils/auth/switchToAuthModule";

type Props = {
  columns: any[];
  rows: any[];
};

const GuestListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const guestState: any = useSelector((state: RootState) => state.guest);
  const navigate = useNavigate();
  const { page, rowsPerPage, searchValue, totalItems, isTableLoading } =
    guestState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Guests",
      icon: FiUser,
    },
  ];

  return (
    <AuthHOC
      moduleName="GUESTS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
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
            searchValue={searchValue}
            onSearchChange={(newValue) => dispatch(setSearchValue(newValue))}
          />

          {/* Table */}
          <div className="border flex flex-col grow rounded bg-white overflow-auto">
            <ATMTable
              disableRowClick={
                !AuthHOC({
                  type: "ACTION",
                  moduleName: "GUESTS",
                  action: AccessAction.VIEW,
                  resultType: "BOOLEAN",
                })
              }
              onRowClick={(row: GuestListResponse) =>
                navigate(
                  `/guest/${row._id}/applications/${switchToAuthModule([
                    { moduleName: "PAN_APPLICATIONS", path: "pan" },
                    { moduleName: "ITR_APPLICATIONS", path: "itr" },
                    { moduleName: "GUMASTA_APPLICATIONS", path: "gumasta" },
                    { moduleName: "DSC_APPLICATIONS", path: "dsc" },
                    { moduleName: "MSME_APPLICATIONS", path: "msme" },
                  ])}`,
                  {
                    state: {
                      guest: row,
                    },
                  }
                )
              }
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
            />{" "}
          </div>

          {/* Pagination */}
          <div className=" flex items-center justify-end border-t border-slate-300">
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

export default GuestListing;
