import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const ATMPageLoader = (props: Props) => {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};

export default ATMPageLoader;
