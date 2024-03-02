import React from "react";
import AOCodeListDialog from "./AOCodeListDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetAoCodeListQuery } from "src/services/AOCodeService";
import { columnTypes } from "../UI/atoms/ATMTable/ATMTable";
import ATMPageLoader from "../UI/atoms/ATMPageLoader/ATMPageLoader";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/AOCodeSlice";
import { BiSearch } from "react-icons/bi";
import ATMLoadingButton from "../UI/atoms/ATMLoadingButton/ATMLoadingButton";
import AddAOCodeWrapper from "./AddAOCode/AddAOCodeWrapper";
import { AccessAction } from "src/utils/Enums/AccessAction";
import AuthHOC from "src/userAccess/AuthHOC";

type Props = {
  onClose: () => void;
};

const columns: columnTypes[] = [
  {
    field: "city",
    headerName: "City",
    flex: "flex-[1_1_0%]",
  },
  {
    field: "areaCode",
    headerName: "Area Code",
    flex: "flex-[1_1_0%]",
  },
  {
    field: "aoType",
    headerName: "AO Type",
    flex: "flex-[1_1_0%]",
  },
  {
    field: "rangeCode",
    headerName: "Range Code",
    flex: "flex-[1_1_0%]",
  },
  {
    field: "aoNo",
    headerName: "AO No.",
    flex: "flex-[1_1_0%]",
  },
];

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

const AOCodeListDialogWrapper = ({ onClose }: Props) => {
  const [AOCodeList, setAOCodeList] = React.useState([]);
  const [isOpenAOCodeForm, setIsOpenAOCodeForm] = React.useState(false);
  const { data, isLoading, isFetching } = useGetAoCodeListQuery({
    limit: 0,
    searchValue: "",
    params: paramList,
    page: 0,
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
    isPaginationRequired: false,
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();

  const handleKeyUp = (e: any) => {
    dispatch(setSearchValue(searchTerm));
  };

  React.useEffect(() => {
    return () => {
      setSearchTerm("");
    };
  }, []);

  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setAOCodeList(data?.data || []);
    }
  }, [isFetching, isLoading, data]);

  React.useEffect(() => {
    if (searchTerm !== "") {
      const filteredData = data?.data?.filter((item: any) => {
        const isNumber = !isNaN(Number(item.aoNo));
        return (
          (isNumber && item.aoNo.toString().includes(searchTerm)) ||
          item.aoType?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          item.areaCode?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          item.city?.toLowerCase()?.includes(searchTerm.toLowerCase())
        );
      });
      setAOCodeList(filteredData || []);
    } else {
      setAOCodeList(data?.data || []);
    }
  }, [searchTerm, data]);

  if (isFetching || isLoading) {
    return <ATMPageLoader />;
  }

  const handleAddClick = () => {
    setIsOpenAOCodeForm(true);
  };

  return (
    <Dialog open={true} maxWidth="lg" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center text-primary-main font-bold">
          AO Codes
          <button onClick={onClose}>
            <MdCancel className="text-red-500 text-2xl" />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex ">
            <div className="border border-slate-400 h-[35px] text-[16px] px-1 rounded flex items-center  hover:border-primary-main bg-slate-100">
              <BiSearch className="text-slate-600 " />
              <input
                className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500 bg-slate-100 "
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex pt-1.5 justify-end">
            <div>
              <AuthHOC moduleName="CITY_CODES" action={AccessAction.ADD}>
                <ATMLoadingButton type="submit" onClick={handleAddClick}>
                  Add New
                </ATMLoadingButton>
              </AuthHOC>
            </div>
          </div>
        </div>
      </DialogTitle>

      <DialogContent>
        {isOpenAOCodeForm && (
          <AddAOCodeWrapper onClose={() => setIsOpenAOCodeForm(false)} />
        )}
        <AOCodeListDialog AOCodeList={AOCodeList} columns={columns} />
      </DialogContent>
    </Dialog>
  );
};

export default AOCodeListDialogWrapper;
