import React from "react";
import { ErrorMessage } from "formik";

type Props = {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  minRows?: number;
  name?: string;
};

const ATMTextArea = ({
  label,
  required = false,
  value,
  onChange,
  className,
  placeholder,
  minRows = 2,
  name = "",
}: Props) => {
  return (
    <div className="relative ">
      {label && (
        <label className=" font-medium text-primary-main text-sm">
          {" "}
          {label} {required && <span className="text-red-500"> * </span>}{" "}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={minRows}
        className={`w-full p-2 bg-white text-slate-700 border border-slate-400 outline-blue-400 rounded ${
          label && "mt-1"
        }  ${className}`}
        placeholder={placeholder}
      />

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
  );
};

export default ATMTextArea;
