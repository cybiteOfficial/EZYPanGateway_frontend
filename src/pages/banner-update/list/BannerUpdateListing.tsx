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
} from "src/redux/slices/BannerUpdateSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";

type Props = {
  columns: any[];
  rows: any[];
};

const BannerUpdateListing = ({ columns, rows }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const bannerUpdateState: any = useSelector(
    (state: RootState) => state.bannerUpdate
  );
  // const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { page, rowsPerPage, totalItems, isTableLoading, searchValue } =
    bannerUpdateState;

  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: IoPersonCircleOutline,
    },
    {
      label: "Banner",
      icon: RxDashboard,
    },
  ];

  return (
    <AuthHOC
      moduleName="BANNERS"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
        {/* Breadcrumbs */}
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex justify-end items-end gap-2">
          <AuthHOC moduleName="BANNERS" action={AccessAction.ADD}>
            <ATMLoadingButton onClick={() => navigate("add")}>
              Add new Banner
            </ATMLoadingButton>
          </AuthHOC>
        </div>
        <div className="border flex flex-col overflow-auto rounded bg-white">
          {/*Table Header */}
          <ATMTableHeader
          isSearchVisible ={false}
            searchValue={searchValue}
            onSearchChange={(newValue) => {
              dispatch(setSearchValue(newValue));
            }}
            page={page}
            rowCount={totalItems}
            rowsPerPage={rowsPerPage}
            rows={rows}
            onRowsPerPageChange={(newValue) =>
              dispatch(setRowsPerPage(newValue))
            }
          />

          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <ATMTable
              columns={columns}
              rows={rows}
              isLoading={isTableLoading}
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

export default BannerUpdateListing;
