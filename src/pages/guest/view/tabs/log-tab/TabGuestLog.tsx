import moment from "moment";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { BiFilter } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { LogListResponse } from "src/models/Log.model";
import { setPage } from "src/redux/slices/TabGuestLogsSlice";
import { AppDispatch, RootState } from "src/redux/store";
import FilterCardWrapper from "./LogFilterDialog/FilterCardWrapper";

const LoaderCard = () => {
  return (
    <div className="flex w-full gap-2 shadow rounded border px-3 py-2 items-stretch animate-pulse">
      <div className="flex flex-col gap-2  w-[130px] ">
        <div className="bg-slate-300 rounded w-full h-[20px]"></div>
        <div className="bg-slate-300 rounded w-full h-[20px]"></div>
      </div>
      <div className="grow  bg-slate-300 rounded"></div>
    </div>
  );
}; 

type Props = {
  renderFilter?: (close: () => void) => React.ReactNode;
}

const FilterDialog =({renderFilter}:Props)=>{ 
  const [isOpenFilter, setIsOpenFilter] = React.useState(false); 
  return (
     <div className=" relative mb-2">
    <button
      type="button"
      onClick={() => setIsOpenFilter((prev) => !prev)}
      className="bg-primary-main text-white rounded flex gap-2 justify-center px-4  py-1 items-center text-sm font-medium h-full"
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
  )
} 


const TabGuestLog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalItems, page, isTableLoading } = useSelector(
    (state: RootState) => state.tabGuestLog
  );

  return (
    <div className="p-2 h-full"> 
    <FilterDialog renderFilter={(close:any) => <FilterCardWrapper close={close} />} />
      <div
        id="scrollable"
        className="flex flex-col gap-4 h-full overflow-auto "
      >
        <InfiniteScroll
          dataLength={items.length}
          hasMore={items.length !== totalItems}
          loader={Array(5)
            .fill(null)
            .map(() => (
              <LoaderCard />
            ))}
          next={() => dispatch(setPage(page + 1))}
          scrollableTarget="scrollable"
          className="flex flex-col gap-2 h-full  "
        >
          {items.map((item: LogListResponse) => (
            <div
              key={item._id}
              className="flex gap-2 border-b border-l-[4px] rounded-lg border-l-secondary-light border-slate-300 px-3 py-2"
            >
              <div className="flex flex-col w-[130px]">
                <div className="text-slate-500 text-sm">
                  {" "}
                  {moment(item.createdAt).format("hh:mm A")}
                </div>
                <div className="text-[13px]">
                  {" "}
                  {moment(item.createdAt).format("DD MMM yyyy")}{" "}
                </div>
              </div>
              <div>{item.remark}</div>
            </div>
          ))}
        </InfiniteScroll>

        {!isTableLoading && !items.length && (
          <div className="text-center"> No logs found of this user ! </div>
        )}
      </div>
    </div>
  );
};

export default TabGuestLog;
