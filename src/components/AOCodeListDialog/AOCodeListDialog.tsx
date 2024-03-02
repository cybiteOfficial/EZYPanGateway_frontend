import React from "react";
import ATMTable, { columnTypes } from "../UI/atoms/ATMTable/ATMTable";
// import AddAOCodeWrapper from "./AddAOCode/AddAOCodeWrapper";

type Props = {
  columns: columnTypes[];
  AOCodeList: any[];
};

const AOCodeListDialog = ({ AOCodeList, columns }: Props) => {
  return (
    <>
      <ATMTable
        columns={columns}
        rows={AOCodeList}
        rowExtraClasses={() => "min-h-[30px]"}
      />
      
    </>
  );
};

export default AOCodeListDialog;
