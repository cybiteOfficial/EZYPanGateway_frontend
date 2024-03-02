import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface Props {
  onClose?: () => void;
  pageContent?: string;
}

const StaticPageDialogWrapper = ({ onClose, pageContent }: Props) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <div className="pb-3 border-b font-medium border-secondary-main flex justify-between">
          <div className=" flex items-center">Page</div>
          <button onClick={onClose} className="pl-10 relative">
            <AiOutlineClose />
          </button>
        </div>
        {pageContent ? (
          <div
            dangerouslySetInnerHTML={{__html:pageContent}}
            className="px-2 "
          ></div>
        ) : null}
        {/* <div className="pt-2">{message}</div> */}
      </DialogContent>
    </Dialog>
  );
};

export default StaticPageDialogWrapper;
