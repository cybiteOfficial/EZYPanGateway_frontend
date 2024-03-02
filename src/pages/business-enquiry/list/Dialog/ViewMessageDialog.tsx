import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";

interface Props {
  onClose?: () => void;
  message?: string;
}

const ViewMessageDialog = ({ onClose, message }: Props) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div className="pb-3 border-b font-medium border-secondary-main flex justify-between">
          <div className=" flex items-center">
            <AiOutlineMail className="font-medium mr-2" />
            Read Message Here
          </div>
          <button onClick={onClose} className="pl-10 relative">
            <AiOutlineClose />

          </button>
        </div>
        <div className="pt-2">{message}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMessageDialog;
