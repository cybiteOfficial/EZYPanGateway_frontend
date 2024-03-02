import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  tooltipTitle: string;
  copyText: string;
  children: React.ReactNode;
  onCopy?: () => void;
};

const ATMCopyToClipboard = ({
  tooltipTitle,
  copyText,
  children,
  onCopy,
}: Props) => {
  return (
    <Tooltip title={tooltipTitle}>
      <div>
        <CopyToClipboard text={copyText} onCopy={onCopy}>
          {children}
        </CopyToClipboard>
      </div>
    </Tooltip>
  );
};

export default ATMCopyToClipboard;
