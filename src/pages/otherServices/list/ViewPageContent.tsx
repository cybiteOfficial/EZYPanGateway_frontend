import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  onClose?: () => void;
  message?: string;
}

const ViewPageContent = ({ onClose, message }: Props) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <div className="pb-3 border-b font-medium border-secondary-main flex justify-between">
          <div className=" flex items-center">
             Page 
          </div>
          <button onClick={onClose} className="pl-10 relative">
            <AiOutlineClose />
          </button>
        </div>
        {message ? (
          <p dangerouslySetInnerHTML={{ __html: message }} className="pt-2" />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ViewPageContent;
