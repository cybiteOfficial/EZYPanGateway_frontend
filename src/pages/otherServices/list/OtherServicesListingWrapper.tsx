import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { OtherServicesListResponse } from "src/models/OtherServices.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/OtherServicesSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import OtherServicesListing from "./OtherServicesListing";
import {
  useDeleteOtherServicesMutation,
  useGetOtherServicesQuery,
} from "src/services/OtherServicesService";
import ViewPageContent from "./ViewPageContent";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";

const OtherServicesListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const otherServicesState: any = useSelector(
    (state: RootState) => state.otherServices
  );

  const [deleteOtherService] = useDeleteOtherServicesMutation();
  const navigate = useNavigate();
  const [pageContents, setPageContents] = useState("");
  const [isOpenPageContentsDialog, setisOpenPageContentsDialog] =
    useState(false);
  const handleClose = () => {
    setisOpenPageContentsDialog(false);
  };
  const getActionOptions = (row: OtherServicesListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/other-services/${row._id}/edit`);
        },
      },
      {
        accessAction: AccessAction.DELETE,
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          showConfirmationDialog({
            title: "Heads Up",
            text: "Are you sure want to Delete this Other Service ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteOtherService(row._id).then((res: any) => {
                  if (res.error) {
                    showToast("error", res?.error?.data?.message);
                  } else {
                    showToast("success", res?.data?.message);
                  }
                });
              }
            },
          });
        },
      },
    ];
  };

  const { items, rowsPerPage, page, searchValue } = otherServicesState;

  const { data, isLoading, isFetching } = useGetOtherServicesQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: [
      "_id",
      "serviceName",
      "serviceDescription",
      "isDeleted",
      "isActive",
      "createdAt",
      "updatedAt",
    ],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });

  // Setting Items
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  const columns: columnTypes[] = [
    {
      field: "serviceName",
      headerName: "Service Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "serviceDescription",
      headerName: "Service Description",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "staticPageContent",
      headerName: "Page",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: OtherServicesListResponse) => {
        const handleClickOpen = () => {
          setPageContents(row.staticPageContent);
          setisOpenPageContentsDialog(true);
        };
        return (
          <button
            className="text-primary-main hover:underline"
            onClick={handleClickOpen}
          >
            View Page
          </button>
        );
      },
    },
    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: OtherServicesListResponse) => {
        const options = getActionOptions(row);
        return <ATMMenu moduleName="OTHER_SERVICES" options={options} />;
      },
    },
  ];

  return (
    <>
      <SideNavLayout>
        <OtherServicesListing
          columns={getColumns(columns, "OTHER_SERVICES")}
          rows={items}
        />
      </SideNavLayout>
      {isOpenPageContentsDialog && (
        <ViewPageContent onClose={handleClose} message={pageContents} />
      )}
    </>
  );
};

export default OtherServicesListingWrapper;
