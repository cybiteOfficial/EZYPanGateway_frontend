import Dialog from "@mui/material/Dialog";
import React from "react";
import { BiFilter, BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

type Props = {
  rowsPerPage: number;
  page: number;
  rows: any[];
  rowCount: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (newValue: number) => void;
  isFilter?: boolean;
  onFilterClick?: () => void;
  searchValue?: string;
  onSearchChange?: (newValue: string) => void;
  renderFilter?: (close: () => void) => React.ReactNode;
  isSearchVisible?: boolean;
  hidePagination?: boolean;
  orderByValue?:any[];
  onOrderByChange?: (newValue: number) => void;
  orderValue?:number
  isShowOrder?:boolean
};

const ATMTableHeader = ({
  rowCount,
  rows,
  rowsPerPage,
  page,
  orderByValue=[{label:'Ascending' , value: 1}, {label:'Descending ' , value:-1} ],
  rowsPerPageOptions = [5, 10, 20, 50, 100],
  onRowsPerPageChange = () => {},
  onOrderByChange = () => {},
  searchValue = "",
  isFilter = false,
  onSearchChange = () => {},
  renderFilter,
  isSearchVisible = true,
  hidePagination = false,
  orderValue=1 ,
  isShowOrder=false
}: Props) => {
  const [isOpenFilter, setIsOpenFilter] = React.useState(false);

  return (
    <div className="p-3 border-b border-slate-300 grid md:grid-cols-2 gap-2 ">
      {/* Left */}
      <div className="flex gap-3 items-stretch ">
        {isSearchVisible && (
          <div className="flex gap-1">
            <div className="border border-slate-400   rounded flex items-center p-1 hover:border-primary-main bg-slate-100">
              <BiSearch className="text-slate-600 text-xl" />
              <input
                className="border-none rounded outline-none px-2 w-[200px] placeholder:text-slate-500 bg-slate-100"
                value={searchValue}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                }}
                placeholder="Search..."
              />
            </div>
          </div>
        )}

        {isFilter && (
          <div className="h-full relative">
            <button
              type="button"
              onClick={() => setIsOpenFilter((prev) => !prev)}
              className="bg-primary-main text-white rounded flex gap-2 justify-center px-4 items-center text-sm font-medium h-full"
            >
              <BiFilter className="text-2xl" /> Filters
            </button>
            {isOpenFilter && (
              // <ClickAwayListener onClickAway={() => setIsOpenFilter(false)}>
              <Dialog open={true}>
                <div className="flex justify-end text-2xl text-slate-500 px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setIsOpenFilter(false)}
                    className="p-1 rounded-full flex justify-center items-center bg-slate-200 hover:bg-red-400 hover:text-white transition-all"
                  >
                    <IoClose />
                  </button>
                </div>
                <div className="px-5 pb-5">
                  <div>{renderFilter?.(() => setIsOpenFilter(false))}</div>
                </div>
              </Dialog>
              // </ClickAwayListener>
            )}
          </div>
        )}
      </div>

      {/* Right */}
        <div className="flex md:justify-end ">
         {isShowOrder &&  <div className="flex items-center mr-5" >
          <select
              value={orderValue}
              onChange={(e) => onOrderByChange(parseInt(e.target.value))}
               className={`rounded-lg p-1 outline-0 bg-slate-100 text-sm font-medium text-black cursor-pointer`}
             >
              {orderByValue.map((option) => {
                return (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                );
              })}
            </select>
          </div>}
          {!hidePagination && (<div className="flex gap-3 items-center">
            <div className="text-sm font-medium text-black">
              Rows per page :
            </div>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
              className={`rounded-lg p-1 outline-0 bg-slate-100 text-sm font-medium text-black cursor-pointer`}
            >
              {rowsPerPageOptions.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>

            <div className="text-sm bg-slate-100 py-1 px-2 rounded-lg text-black font-medium">
              Showing &nbsp; {rowsPerPage * (page - 1) + 1} -{" "}
              {rowsPerPage * (page - 1) + rows.length} of {rowCount}
            </div>
          </div>)}
        </div>
    
    </div>
  );
};

export default ATMTableHeader;
