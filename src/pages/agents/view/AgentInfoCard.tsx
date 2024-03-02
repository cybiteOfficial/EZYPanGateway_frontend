import React from "react";

type Props = {
  infoData: { name: string; mobile: string };
  isInfoLoading: boolean;
};

const AgentInfoCard = ({ infoData, isInfoLoading }: Props) => {
  if (isInfoLoading) {
    return (
      <div className=" flex flex-col gap-4 text-center py-5 border-b animate-pulse ">
        <div className="flex flex-col  gap-2">
          <div className="flex justify-center">
            <div className="h-[50px] w-[50px] rounded-full bg-slate-300"></div>
          </div>
          <div className="flex flex-col items-center gap-2" >
            <div className="bg-slate-300 h-[24px] w-[150px] rounded"></div>
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
              {infoData?.name ? infoData?.name[0].toUpperCase() : ""}
            </div>
          </div>
          <div className="text-lg text-primary-dark font-medium ">
            {infoData.name}
          </div>
          <div className="text-sm text-slate-600"> {infoData.mobile} </div>
        </div>
      </div>
    );
  }
};

export default AgentInfoCard;
