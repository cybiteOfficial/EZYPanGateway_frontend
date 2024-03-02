import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ErrorMessage } from "formik";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
  size?: "small" | "medium";
  name: string;
  isLoading?: boolean;
  isSearch?: boolean;
};

const ATMSelect = ({
  options,
  label,
  required = false,
  value,
  onChange,
  size = "small",
  name,
  isLoading = false,
  isSearch = false,
}: Props) => {
  return (
    <>
      <div className="relative ">
        {label && (
          <label className=" font-medium text-primary-main text-sm">
            {" "}
            {label} {required && <span className="text-red-500"> * </span>}{" "}
          </label>
        )}
        <div className="flex justify-between items-center gap-2">
          <FormControl fullWidth>
            {isSearch ? (
              <Autocomplete
                value={options?.find((option) => option?.value === value) || ""}
                onChange={(e, newValue) => onChange(newValue?.value)}
                options={options}
                renderInput={(params) => {
                  return <TextField {...params} />;
                }}
                size={size}
                disabled={isLoading}
              />
            ) : (
              <Select
                name={name}
                value={value}
                onChange={(e) => {
                  onChange(e);
                }}
                size={size}
                className="border border-slate-300 mt-1 2xl:h-full sm:h-full xs:h-7"
                displayEmpty
                disabled={isLoading}
              >
                <MenuItem value="">
                  <span className="text-slate-400">Select {label}</span>
                </MenuItem>
                {options?.map((option) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          {isLoading && <CircularProgress size={25} />}
        </div>

        {name && (
          <ErrorMessage name={name}>
            {(errMsg) => (
              <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-500">
                {errMsg}
              </p>
            )}
          </ErrorMessage>
        )}
      </div>
    </>
  );
};
export default ATMSelect;
