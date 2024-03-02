import React ,{useState} from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { RejectionListResponse } from "src/models/RejectionList.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/GumastaConfigDistrict";
import { AppDispatch, RootState } from "src/redux/store";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import { showToast } from "src/utils/toaster/showToast";
import DistrictList from "./DistrictList";
import { AccessAction } from "src/utils/Enums/AccessAction";
import { useGetDistrictPaginationListQuery  } from "src/services/GumastaConfigService";
import { useDeleteDistrictByIdMutation } from "src/services/GumastaConfigService";
import EditDistrictWrapper from "../edit/EditDistrictWrapper";

const paramList = [
  "_id",
  "state",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const DistrictListWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openEditDialog , setOpenEditDialog]= useState(false)
  const [editId , setEditId]= useState('')
  const rejectionListState: any = useSelector(
    (state: RootState) => state.gumastaConfigDistrict
  );
  const { items, rowsPerPage, page, searchValue } = rejectionListState;

  const [deleteDistrict] = useDeleteDistrictByIdMutation();
  const getActionOptions = (row: RejectionListResponse) => {
    return [
      {
        accessAction: AccessAction.EDIT,
        label: (
          <div onClick={()=>{setOpenEditDialog(true)}} className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {setEditId(row?._id)},
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
            text: "Are you sure want to Delete this district ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result.isConfirmed) {
                deleteDistrict(row?._id).then((res: any) => {
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
  const { data, isLoading, isFetching } = useGetDistrictPaginationListQuery({
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
      field: "districtname",
      headerName: "District Name",
      flex: "flex-[1.5_1.5_0%]",
      renderCell: (row: any) => (
        <span> {row?.district} </span>
      ),
    },
    {
        field: "statename",
        headerName: "State Name",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: any) => (
          <span> {row?.state} </span>
        ),
      },
    {
      noAuthRequired: true,
      field: "action",
      headerName: "Action",
      flex: "flex-[1_1_0%]",
      renderCell: (row: any) => {
        const options = getActionOptions(row);
        return <ATMMenu moduleName="REJECTION_LISTS" options={options} />;
      },
    },
  ];

  return (
    <>
      <DistrictList
        columns={columns}
        rows={items}
      /> 
      {openEditDialog &&  <EditDistrictWrapper onClose={()=>{setOpenEditDialog(false)}} districtId={editId}  />}
    </>
  );
};

export default DistrictListWrapper;
