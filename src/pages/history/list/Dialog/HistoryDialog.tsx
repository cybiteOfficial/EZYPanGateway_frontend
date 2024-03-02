import React from "react";
import  Dialog from "@mui/material/Dialog";
import { formatDateAndTime } from "src/utils/dateAndTime";
import {RxCross2} from 'react-icons/rx'

type Prop = {
  data: any;
  onClose(): void;
};
export const applicationStatus = (el: any) => {
  switch (el?.status) {
    case "PENDING":
      return {
        className: "text-yellow-500",
        label: "Pending",
        name: el?.appliedByName,
        Date: el?.appliedOnDate,
      };
    case "IN_PROGRESS":
      return {
        className: "text-green-500",
        label: "In Progress",
        name: el?.assignedByName,
        Date:el?.assignedOnDate ,
      };
    case "REJECT":
      return {
        className: "text-red-700 ",
        label: "Reject",
        name: el?.rejectedByName,
        Date:el?.rejectedOnDate ,
      };
    case "VERIFY":
      return {
        className: "text-green-500",
        label: "Verify",
        name: el?.verifiedByName,
        Date:el?.verifiedOnDate ,
      };
    case "GENERATE":
      return {
        className: "text-green-500",
        label: "Generate",
        name: el?.generatedByName,
        Date:el?.generatedOnDate ,
      };
    case "DONE":
      return {
        className: "text-green-500",
        label: "Done",
        name: el?.completedByName,
        Date:el?.completedOnDate ,
      };
    case "CANCELLED":
      return {
        className: "text-red-700",
        label: "Cancelled",
        name: el?.cancelledByName,
        Date:el?.cancelledOnDate ,
      };
    case "COMPLETE":
      return {
        className: "text-green-500",
        label: "Complete",
        name: el?.completedByName,
        Date:el?.completedOnDate        ,
      };
    case "PAYMENT_PENDING":
      return {
        className: "text-red-700 ",
        label: "Failed",
        Date:el?.createdAt ,
      };
    case "FAILURE":
      return {
        className: "text-red-700",
        label: "Failed",
        Date:el?.createdAt ,
      };
    case "SUCCESS":
      return {
        className: "text-green-500",
        label: "Success",
        Date:el?.createdAt ,
      };
  }
};

export const applicationStatusForHistory = (el: any) => {
  switch (el?.status) {
    case "PENDING":
      return {
        className: "text-yellow-500",
        label: "Pending",
        name:el?.moveToPendingByName === '' ?  el?.appliedByName : el?.moveToPendingByName,
        Date:el?.moveToPendingOnDate === '' ? el?.appliedOnDate : el?.moveToPendingOnDate   ,
      };
    case "IN_PROGRESS":
      return {
        className: "text-green-500",
        label: "In Progress",
        name: el?.assignedByName,
        Date:el?.assignedOnDate ,
      };
    case "REJECT":
      return {
        className: "text-red-700 ",
        label: "Reject",
        name: el?.rejectedByName,
        Date:el?.rejectedOnDate ,
      };
    case "VERIFY":
      return {
        className: "text-green-500",
        label: "Verify",
        name: el?.verifiedByName,
        Date:el?.verifiedOnDate ,
      };
    case "GENERATE":
      return {
        className: "text-green-500",
        label: "Generate",
        name: el?.generatedByName,
        Date:el?.generatedOnDate ,
      };
    case "DONE":
      return {
        className: "text-green-500",
        label: "Done",
        name: el?.completedByName,
        Date:el?.completedOnDate ,
      };
    case "CANCELLED":
      return {
        className: "text-red-700",
        label: "Cancelled",
        name: el?.cancelledByName,
        Date:el?.cancelledOnDate ,
      };
    case "COMPLETE":
      return {
        className: "text-green-500",
        label: "Complete",
        name: el?.completedByName,
        Date:el?.completedOnDate        ,
      };
    case "PAYMENT_PENDING":
      return {
        className: "text-red-700 ",
        label: "Failed",
        Date:el?.createdAt ,
      };
    case "FAILURE":
      return {
        className: "text-red-700",
        label: "Failed",
        Date:el?.createdAt ,
      };
    case "SUCCESS":
      return {
        className: "text-green-500",
        label: "Success",
        Date:el?.createdAt ,
      };
  }
};

const HistoryDialog = ({ data , onClose }: Prop) => {
  return (
    <>
      <Dialog
        open={data?.data?.length ? true : false}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px", // Set your width here
            },
          },
        }}
      > 
      <div className="flex justify-end pt-1 pr-2 cursor-pointer" onClick={()=>{onClose()}} > <span className=" bg-slate-400 rounded-full p-1 text-white hover:bg-red-400  transition-all" ><RxCross2 size='1.2em'  /></span> </div>
        <h3 className="flex justify-center font-semibold text-[18px] pb-2 border-b-2">
          Application Status Flow
        </h3>
        <div className="grid grid-cols-3  my-4 mx-2">
              <div className="text-[16px] border-x-2 border-t-2">
                <div className="text-[16px] border-b-2 py-1 text-center text-primary-dark font-semibold">
                Date-Time
                </div>
                <div>
                  {data?.data?.map((el: any, ind: any) => {
                    return (
                      <div
                        key={ind}
                        className="h-16 text-center text-[14px ] border-b  pt-2"
                      >
                        <div className="text-slate-700 font-medium">
                        
                        {formatDateAndTime(
                          applicationStatusForHistory(el)?.Date,
                          "DD MMM yyyy"
                        )}
                      </div>
                      <div className="text-[13px] font-medium text-slate-400">
                        {formatDateAndTime(applicationStatusForHistory(el)?.Date, "hh:mm A")}
                      </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-[16px] border-t-2">
                <div className="text-[16px] border-b-2 py-1 text-center font-semibold">
                  Status
                </div>
                <div>
                  {data?.data?.map((el: any, ind: any) => {
                    return (
                      <div
                        key={ind}
                        className="h-16 text-center text-[14px ] border-b pt-2"
                      >
                        <p
                        className={`${
                          applicationStatusForHistory(el)?.className
                        } font-semibold py-[10px]`}
                      >
                        {el?.statusToShow === "ASSIGNEE_CHANGED" ?  <div className="text-[14px] font-medium text-blue-400" > Assignee change</div> : applicationStatusForHistory(el)?.label}
                      </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-[16px]  border-x-2   border-t-2 ">
                <div className="text-[16px] border-b-2 py-1 text-center font-semibold">
                  Updated By
                </div>
                <div>
                  {data?.data?.map((el: any, ind: any) => {
                    return (
                      <div
                        key={ind}
                        className="h-16 text-center text-[14px ] border-b pt-2"
                      >
                        <p className="py-[8px]" >{el?.statusToShow === "ASSIGNEE_CHANGED" ?  <div className="text-[14px]  capitalize" >{el?.assignedByName} </div> :applicationStatusForHistory(el)?.name} </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div> 
      </Dialog>
    </>
  );
};

export default HistoryDialog;
