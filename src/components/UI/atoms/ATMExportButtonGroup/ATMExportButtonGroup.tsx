import React from "react";
import { BiChevronDown } from "react-icons/bi";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ATMExportButton from "../ATMExportButton/ATMExportButton";
// import { Data, Headers } from "react-csv/components/CommonPropTypes";

type Props = {
  isAllExporting: boolean;
  isCurrentExporting: boolean;
  onExport: (done: () => void, isAllExport: boolean) => void;
  allExportFileName: string;
  currentExportFileName: string;
  exportDataHeaders?: any
  exportData?: any
};

const ATMExportButtonGroup = ({
  isAllExporting,
  isCurrentExporting,
  onExport,
  allExportFileName,
  currentExportFileName,
  exportDataHeaders =[] ,
  exportData = []
}: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsExpanded((prev: boolean) => !prev)}
        className="bg-secondary-main py-2 px-4 rounded text-white text-sm font-medium flex items-center gap-3"
      >
        Export
        <div>
          <BiChevronDown className="text-xl" />
        </div>
      </button>

      {isExpanded && (
        <ClickAwayListener onClickAway={() => setIsExpanded(false)}>
          <div className="absolute w-[150px] rounded py-2 bg-white border  right-0 shadow z-[51]">
            <ATMExportButton
              data={exportData}
              headers={exportDataHeaders}
              fileName={allExportFileName}
              isLoading={isAllExporting}
              onClick={(done) => {
                onExport(done, true);
              }}
              btnName="All Export"
              loadingText="Exporting..."
              className="bg-white border-none text-secondary-main hover:bg-white"
            />

            <ATMExportButton
              data={exportData}
              headers={exportDataHeaders}
              fileName={currentExportFileName}
              isLoading={isCurrentExporting}
              onClick={(done) => {
                onExport(done, false);
              }}
              btnName="Current Export"
              loadingText="Exporting..."
              className="bg-white border-none text-secondary-main hover:bg-white"
            />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default ATMExportButtonGroup;
