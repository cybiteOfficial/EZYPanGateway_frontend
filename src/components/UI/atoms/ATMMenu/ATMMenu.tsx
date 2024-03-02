import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import AuthHOC from "src/userAccess/AuthHOC";

const ITEM_HEIGHT = 48;

export type OptionType = {
  label: React.ReactNode;
  onClick: () => void;
  accessAction?: string;
  noAuthRequired?: boolean;
};

type Props = {
  options: OptionType[];
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  moduleName?: string;
};

const getOptions = (options: OptionType[], moduleName: string) => {
  return options.filter((option) => {
    if (option.noAuthRequired) {
      return true;
    } else {
      return AuthHOC({
        type: "ACTION",
        moduleName,
        resultType: "BOOLEAN",
        action: option.accessAction,
      });
    }
  });
};

const ATMMenu = ({
  options,
  orientation = "vertical",
  disabled = false,
  moduleName = "",
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabled}
      >
        {orientation === "vertical" ? (
          <HiDotsVertical className="text-xl" />
        ) : (
          <HiDotsHorizontal className="text-xl" />
        )}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {getOptions(options, moduleName).map((option, optionIndex) => (
          <MenuItem
            key={optionIndex}
            onClick={(e) => {
              option.onClick();
              handleClose(e);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ATMMenu;
