import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/AOCodeSlice";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import AOCodeListing from "./AOCodeListing";
import { AppDispatch, RootState } from "src/redux/store";
import { AOCodeListResponse } from "src/models/AOCodeList.model";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { useGetAoCodeListQuery , useDeleteAoCodeMutation } from "src/services/AOCodeService";
import { getColumns } from "src/utils/auth/getColumns";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { MdDeleteOutline } from "react-icons/md";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";

const paramList = [
  "_id",
  "city",
  "areaCode",
  "aoType",
  "rangeCode",
  "aoNo",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];
const AOCodeListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const [deleteAoCode] = useDeleteAoCodeMutation()
  const aoCodeListState: any = useSelector(
    (state: RootState) => state.aoCodeList
  );
  const { items, page, rowsPerPage, searchValue } = aoCodeListState;
  const navigate = useNavigate();

  const getActionOptions = (row: AOCodeListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/ao-code-list/${row._id}/edit`);
        },
      },
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          showConfirmationDialog({
            title: "Heads Up",
            text: "Are you sure want to Delete this AO Code ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteAoCode(row._id).then((res: any) => {
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
  //Fetching Data through RTK Query
  const { data, isLoading, isFetching } = useGetAoCodeListQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: paramList,
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
    orderBy: "city",
    orderByValue: 1,
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
  }, [isFetching, isLoading, data]);

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "city",
      headerName: "City",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AOCodeListResponse) => <span> {row.city} </span>,
    },
    {
      field: "areaCode",
      headerName: "Area Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AOCodeListResponse) => <span> {row.areaCode} </span>,
    },
    {
      field: "aoType",
      headerName: "AO Type",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AOCodeListResponse) => <span> {row.aoType} </span>,
    },
    {
      field: "rangeCode",
      headerName: "Range Code",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AOCodeListResponse) => <span> {row.rangeCode} </span>,
    },
    {
      field: "aoNo",
      headerName: "AO NO",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AOCodeListResponse) => <span> {row.aoNo} </span>,
    },
    {
      noAuthRequired: true,
      field: "actions",
      headerName: "Actions",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: AOCodeListResponse) => {
        const options = getActionOptions(row);
        return <ATMMenu moduleName="CITY_CODES" options={options} />;
      },
      align: "start",
    },
  ];

  return (
    <>
      <SideNavLayout>
        <AOCodeListing
          columns={getColumns(columns, "CITY_CODES")}
          rows={items}
        />
      </SideNavLayout>
    </>
  );
};

export default AOCodeListingWrapper;
