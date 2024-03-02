import React from "react";
import { BsPersonFill } from "react-icons/bs";

type Props = {
  infoData: {  mobile: string };
  isInfoLoading: boolean;
};

const GuestInfoCard = ({ infoData, isInfoLoading }: Props) => {
  if (isInfoLoading) {
    return (
      <div className=" flex flex-col gap-4 text-center py-5 border-b animate-pulse ">
        <div className="flex flex-col  gap-2">
          <div className="flex justify-center">
            <div className="h-[50px] w-[50px] rounded-full bg-slate-300"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-slate-300 h-[15px] w-[120px] rounded"> </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex flex-col gap-4 text-center py-5 border-b ">
        <div className="flex flex-col  gap-1">
          <div className="flex justify-center">
            <div className="h-[50px] w-[50px] rounded-full flex justify-center items-center text-white font-medium text-xl bg-primary-dark">
              <BsPersonFill className="text-xl" />
            </div>
          </div>
          <div className="text-sm text-slate-600">
            {" "}
            {infoData?.mobile || "N/A"}{" "}
          </div>
        </div>
      </div>
    );
  }
};

export default GuestInfoCard;
