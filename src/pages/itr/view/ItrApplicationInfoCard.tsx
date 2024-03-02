import React from "react";

type Props = {};

const ItrApplicationInfoCard = (props: Props) => {
  return (
    <div className=" flex flex-col gap-4 text-center py-5 border-b ">
      <div className="flex flex-col  gap-1">
        <div className="flex justify-center">
          <div className="h-[50px] w-[50px] rounded-full flex justify-center items-center text-white font-medium text-xl bg-primary-dark">
            H
          </div>
        </div>
        <div className="text-lg text-primary-dark font-medium ">
          {" "}
          User Name{" "}
        </div>
        <div className="text-sm text-slate-600"> +91 1234567890 </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          className="px-3 py-1 rounded bg-green-500 text-white text-[12px] font-medium"
        >
          {" "}
          DONE{" "}
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded bg-red-500 text-white text-[12px] font-medium"
        >
          {" "}
          REJECT{" "}
        </button>
      </div>
    </div>
  );
};

export default ItrApplicationInfoCard;
