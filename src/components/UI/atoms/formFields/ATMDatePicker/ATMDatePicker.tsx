import React from "react";
import { ErrorMessage } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { getInputHeight, Size } from "src/utils/formUtils/getInputHeight";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

type Props = {
  label?: string;
  required?: boolean;
  name: string;
  value: any;
  onChange: (value: any) => void;
  size?: Size;
  minDate?: string;
  maxDate?: string;
};

const ATMDatePicker = ({
  label,
  name,
  required = false,
  value,
  onChange,
  size = "small",
  minDate,
  maxDate,
}: Props) => {
  return (
    <div className="relative">
      {label && (
        <label className=" font-medium text-primary-main text-sm">
          {" "}
          {label} {required && <span className="text-red-500"> * </span>}{" "}
        </label>
      )}

      <div
        className={`${label && "mt-1"} ${getInputHeight(
          size
        )} flex items-center`}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                className="bg-white"
              />
            )}
            minDate={minDate}
            maxDate={maxDate}
            
          />
        </LocalizationProvider>
      </div>

      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => (
            <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-500">
              {" "}
              {errMsg}{" "}
            </p>
          )}
        </ErrorMessage>
      )}
    </div>
  );
};

export default ATMDatePicker;
