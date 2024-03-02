import React from "react";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import { useNavigate } from "react-router-dom";
import {
  setFilterBy as setPANFilter,
  setSearchValue as setPANSearch,
} from "src/redux/slices/TabHistoryPanApplicationSlice";
import {
  setFilterBy as setITRFilter,
  setSearchValue as setITRSearch,
} from "src/redux/slices/TabHistoryITRApplicationSlice";
import {
  setFilterBy as setGumastaFilter,
  setSearchValue as setGumastaSearch,
} from "src/redux/slices/TabHistoryGumastaApplicationSlice";
import {
  setFilterBy as setDSCFilter,
  setSearchValue as setDSCSearch,
} from "src/redux/slices/TabHistoryDSCApplicationSlice";
import {
  setFilterBy as setMSMEFilter,
  setSearchValue as setMSMESearch,
} from "src/redux/slices/TabHistoryMSMEApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { ReportListResponse } from "src/models/Report.model";

type Props = {
  reportData: ReportListResponse[];
  isTableLoading: boolean;
};
type Application = "pan" | "itr" | "gumasta" | "dsc" | "msme";
type Status = "GENERATE" | "VERIFY" | "REJECT" | "DONE";

type columnType = {
  label: string;
  key: Application;
};

const columns: columnType[] = [
  { label: "PAN", key: "pan" },
  { label: "ITR", key: "itr" },
  { label: "Gumasta", key: "gumasta" },
  { label: "DSC", key: "dsc" },
  { label: "MSME", key: "msme" },
  // { label: "Instant eKYC PAN", key: "digitalPan" },
];

const DistributorReportTable = ({ reportData, isTableLoading }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { filterBy: panFilter } = useSelector(
    (state: RootState) => state.tabHistoryPanApplication
  );
  const { filterBy: itrFilter } = useSelector(
    (state: RootState) => state.tabHistoryITRApplication
  );
  const { filterBy: gumastaFilter } = useSelector(
    (state: RootState) => state.tabHistoryGumastaApplication
  );
  const { filterBy: dscFilter } = useSelector(
    (state: RootState) => state.tabHistoryDSCApplication
  );
  const { filterBy: msmeFilter } = useSelector(
    (state: RootState) => state.tabHistoryMSMEApplication
  );

  const handleSetFilter = (
    application: Application,
    { status, name }: { status: Status; name: string }
  ) => {
    switch (application) {
      case "pan":
        dispatch(setPANSearch(''))
        dispatch(
          setPANFilter(
            panFilter.map((filter) => {
              if (filter.fieldName === "status") {
                return {
                  ...filter,
                  value: [status],
                };
              } 
              else if(filter.fieldName === "appliedById"){
                return {
                  ...filter,
                  value: [name],
                };
              } 
              else {
                return filter;
              }
            })
          )
        );
        break;

      case "itr":
        dispatch(setITRSearch(''))
        dispatch(
          setITRFilter(
            itrFilter.map((filter) => {
              if (filter.fieldName === "status") {
                return {
                  ...filter,
                  value: [status],
                };
              } 
              else if(filter.fieldName === "appliedById"){
                return {
                  ...filter,
                  value: [name],
                };
              } 
              else {
                return filter;
              }
            })
          )
        );
        break;

      case "gumasta":
        dispatch(setGumastaSearch(''));
        dispatch(
          setGumastaFilter(
            gumastaFilter.map((filter) => {
              if (filter.fieldName === "status") {
                return {
                  ...filter,
                  value: [status],
                };
              } 
              else if(filter.fieldName === "appliedById"){
                return {
                  ...filter,
                  value: [name],
                };
              } 
              else {
                return filter;
              }
            })
          )
        );
        break;

      case "dsc":
        dispatch(setDSCSearch(''));
        dispatch(
          setDSCFilter(
            dscFilter.map((filter) => {
              if (filter.fieldName === "status") {
                return {
                  ...filter,
                  value: [status],
                };
              } 
              else if(filter.fieldName === "appliedById"){
                return {
                  ...filter,
                  value: [name],
                };
              } 
              else {
                return filter;
              }
            })
          )
        );
        break;

      case "msme":
        dispatch(setMSMESearch(''));
        dispatch(
          setMSMEFilter(
            msmeFilter.map((filter) => {
              if (filter.fieldName === "status") {
                return {
                  ...filter,
                  value: [status],
                };
              } 
               else if(filter.fieldName === "appliedById"){
                return {
                  ...filter,
                  value: [name],
                };
              } 
              else {
                return filter;
              }
            })
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-w-fit w-full h-full flex flex-col border overflow-auto relative ">
      {/* Columns */}
      <div className="flex bg-slate-50 border-b border-slate-500  w-full font-medium sticky  top-0 min-h-[40px] z-[1200] ">
        <div
          className={`text-primary-dark text-sm py-2  min-w-[180px] px-2 border-r border-slate-500 sticky left-0 top-0 bg-slate-50  `}
        >
          Name
        </div>
        <div className=" flex">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`text-primary-dark text-sm py-2  text-center min-w-[244px] px-2 ${
                columnIndex !== columns.length - 1 &&
                "border-r border-slate-500"
              }`}
            >
              {column.label}
            </div>
          ))}
        </div>
      </div>

      {/* Sub Columns */}
      <div className="flex border-b border-slate-500 sticky top-[40px] bg-white z-[1200]">
        <div className="border-r border-slate-500 min-w-[180px] px-2 sticky left-0 bg-white"></div>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`flex text-[13px] justify-between  border-slate-500 min-w-[244px] font-medium  ${
                index !== 5 && "border-r"
              }`}
            >
              <div className="text-secondary-main border-r border-slate-500  text-center p-1 min-w-[59px] ">
                Generate
              </div>
              <div className="text-green-500 border-r border-slate-500  text-center p-1 min-w-[59px] ">
                Verify
              </div>
              <div className="text-red-500 border-r border-slate-500  text-center p-1 min-w-[59px] ">
                Reject
              </div>
              <div className="text-cyan-500   text-center p-1 min-w-[59px]">
                Done
              </div>
            </div>
          ))}
      </div>

      {/* Counts */}
      <div className="grow w-full relative">
        {isTableLoading ? (
          <div className="flex flex-col gap-3 animate-pulse p-2 ">
            {Array(5)
              .fill(null)
              .map(() => (
                <div className="h-[40px] rounded bg-slate-200"></div>
              ))}
          </div>
        ) : reportData.length ? (
          reportData?.map((reportData, reportDataIndex) => (
            <div
              key={reportDataIndex}
              className={`flex border-b w-full    ${
                reportDataIndex % 2 !== 0 && "bg-stone-100"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  dispatch(setPANSearch(reportData.distributorName));
                  navigate(`/history/pan`);
                }}
                className={`flex text-primary-main px-2 min-w-[180px]  border-r border-slate-300 hover:underline sticky left-0 ${
                  reportDataIndex % 2 !== 0 ? "bg-stone-100" : "bg-white"
                }`}
              >
                <div className="flex flex-col space-y-0.5 items-start">
                  <div className="font-medium text-lg">
                    {reportData.distributorName}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {reportData.distributorSjbtCode}
                  </div>
                </div>
              </button>
              <div className="flex w-full   ">
                {columns?.map((column, columnIndex: number) => (
                  <div
                    key={columnIndex}
                    className={`flex text-[13px] justify-between border-r border-slate-300 min-w-[244px]  font-medium`}
                  >
                    <Tooltip title={reportData[column.key].generate}>
                      <button
                        type="button"
                        onClick={() => {
                          handleSetFilter(column.key, {
                            status: "GENERATE",
                            name:reportData?._id,
                          });
                          navigate(`/history/${column.key}`);
                        }}
                        className="text-primary-dark  p-1 text-ellipsis overflow-hidden flex justify-center min-w-[59px] py-2 "
                      >
                        {reportData[column.key].generate}
                      </button>
                    </Tooltip>

                    <Tooltip title={reportData[column.key].verified}>
                      <button
                        type="button"
                        onClick={() => {
                          handleSetFilter(column.key, {
                            status: "VERIFY",
                            name:reportData?._id,
                          });
                          navigate(`/history/${column.key}`);
                        }}
                        className="text-primary-dark  text-center p-1 text-ellipsis overflow-hidden flex justify-center min-w-[59px] py-2 "
                      >
                        {reportData[column.key].verified}
                      </button>
                    </Tooltip>

                    <Tooltip title={reportData[column.key].rejected}>
                      <button
                        type="button"
                        onClick={() => {
                          handleSetFilter(column.key, {
                            status: "REJECT",
                            name:reportData?._id,
                          });
                          navigate(`/history/${column.key}`);
                        }}
                        className="text-primary-dark  text-center p-1 text-ellipsis overflow-hidden flex justify-center min-w-[59px] py-2 "
                      >
                        {reportData[column.key].rejected}
                      </button>
                    </Tooltip>

                    <Tooltip title={reportData[column.key].done}>
                      <button
                        type="button"
                        onClick={() => {
                          handleSetFilter(column.key, {
                            status: "DONE",
                            name:reportData?._id,
                          });
                          navigate(`/history/${column.key}`);
                        }}
                        className="text-primary-dark  text-center p-1 text-ellipsis overflow-hidden flex justify-center min-w-[59px] py-2"
                      >
                        {reportData[column.key].done}
                      </button>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="w-[90%] text-center py-3 text-slate-400 font-medium">
            {" "}
            No Data Found !{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributorReportTable;
