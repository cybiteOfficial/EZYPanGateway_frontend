import React from "react";
import { HiDotsVertical } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { UserAccessListResponse } from "src/models/UserAccess.model";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/userAccessSlice";
// import { AppDispatch, RootState } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import UserAccessListing from "./UserAccess";

const columns: columnTypes[] = [
    {
        field: "name",
        headerName: "Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: UserAccessListResponse) => <span> {row.name} </span>,
    },
    {
        field: "dob",
        headerName: "DOB",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: UserAccessListResponse) => {
            return <span > {row.dob} </span>;
        },
    },
    {
        field: "date_and_time",
        headerName: "Date - Time",
        noAuthRequired: true,
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: UserAccessListResponse) => (
            <span > {row.date_and_time} </span>
        ),
    },
    {
        field: "email",
        headerName: "Email",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: UserAccessListResponse) => {
            return <span > {row.email} </span>;
        },
    },
    {
        field: "mobile",
        headerName: "Mobile",
        flex: "flex-[1_1_0%]",
    },
    {
        field: "is_active",
        headerName: "Status",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: UserAccessListResponse) => {
            return<div>
            {row.is_active === true ? (
              <span className="text-green-400 font-medium	">Verified</span>
            ) : (
              <span className="text-red-400 font-medium	">Not Verified </span>
            )}
          </div>
      ;
        },
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: "flex-[0.5_0.5_0%]",
        renderCell: (row: any) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                {" "}
                <HiDotsVertical className="text-xl text-slate-600 font-bold " />{" "}
            </button>
        ),
        align: "start",
    },
];

const rows = [
    {
        date_and_time: "21 June 2022 - 06:21pm",
        name: "Himanshu",
        dob: "23/03/1998",
        email: "Jain@gmail.com",
        is_active: true,
        mobile: "8574859685",
        _id : 1
    },

    {
        date_and_time: "21 June 2022 - 06:21pm",
        name: "Himanshu",
        dob: "23/03/1998",
        email: "Jain@gmail.com",
        is_active: true,
        mobile: "8574859685",
        _id : 2
    },
    {
         date_and_time: "21 June 2022 - 06:21pm",
        name: "Himanshu",
        dob: "23/03/1998",
        email: "Jain@gmail.com",
        is_active: false,
        mobile: "8574859685",
        _id : 3

    },

    {
         date_and_time: "21 June 2022 - 06:21pm",
        name: "Himanshu",
        dob: "23/03/1998",
        email: "Jain@gmail.com",
        is_active: false,
        mobile: "8574859685",
        _id : 4
    },
    {
         date_and_time: "21 June 2022 - 06:21pm",
        name: "Himanshu",
        dob: "23/03/1998",
        email: "Jain@gmail.com",
        is_active: true,
        mobile: "8574859685",
        _id : 5
    },

    {
         date_and_time: "21 June 2022 - 06:21pm",
        name: "Himanshu",
        dob: "23/03/1998",
        email: "Jain@gmail.com",
        is_active: true,
        mobile: "8574859685",
        _id : 6
    },
];

const UserAccessListingWrapper = () => {
    // const userAccessState: any = useSelector((state: RootState) => state.userAccess);

    // const { page, rowsPerPage } = userAccessState;

    // const dispatch = useDispatch<AppDispatch>();
    // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "name", "mobile"],
    //     page: page,
    //     filterBy: [
    //         {
    //             fieldName: "",
    //             value: [],
    //         },
    //     ],
    //     dateFilter: {
    //         start_date: "",
    //         end_date: "",
    //         dateFilterKey: "",
    //     },
    //     orderBy: "createdAt",
    //     orderByValue: -1,
    //     isPaginationRequired: true,
    // });

    // useEffect(() => {
    //     if (!isFetching && !isLoading) {
    //         dispatch(setIsTableLoading(false));
    //         dispatch(setItems(data || []));
    //         dispatch(setTotalItems(data?.totalItems || 4));
    //     } else {
    //         dispatch(setIsTableLoading(true));
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoading, isFetching, data]);

    return (
        <>
            <SideNavLayout>
                <UserAccessListing columns={columns} rows={rows} />
            </SideNavLayout>
        </>
    );
};

export default UserAccessListingWrapper;
