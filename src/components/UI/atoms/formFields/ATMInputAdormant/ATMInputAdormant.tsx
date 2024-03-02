import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { getInputHeight } from "src/utils/formUtils/getInputHeight";
import { twMerge } from "tailwind-merge";

export interface ATMInputAdormantPropTypes {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  adormant: string | React.ReactNode;
  adormantProps: {
    position?: "start" | "end";
    onClick?: () => void;
    extraClasses?: string;
  };
  type?: "text" | "password" | "number";
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: "small" | "medium" | "large",

}

const ATMInputAdormant = ({
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  label,
  required = false,
  disabled = false,
  readonly = false,
  adormant,
  adormantProps = {
    position: "start",
  },
  size= "small",

}: ATMInputAdormantPropTypes) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="">
      {label && (
        <label className="text-slate-500">
          {" "}
          {label} {required && <span className="text-red-500"> * </span>}{" "}
        </label>
      )}

      <div
        className={`${getInputHeight(size)} w-full border border-slate-400 rounded ${
          label && "mt-1"
        } flex ${isFocus && "border-blue-400"} ${className} `}
      >
        {adormantProps.position === "start" && (
          <div
            onClick={() => adormantProps.onClick && adormantProps.onClick()}
            className={twMerge(
              `w-[15%] h-full flex justify-center items-center bg-slate-300 border-r border-slate-400 rounded-l ${
                adormantProps.onClick && "cursor-pointer"
              } ${adormantProps.extraClasses}`
            )}
          >
            {adormant}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder={placeholder}
          className={`w-full h-full p-1 text-slate-700 border-0 outline-0 rounded `}
          disabled={disabled}
          readOnly={readonly}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        />

        {adormantProps.position === "end" && (
          <div
            onClick={() => adormantProps.onClick && adormantProps.onClick()}
            className={twMerge(
              `w-[15%] h-full flex justify-center items-center bg-slate-300 border-l border-slate-400 rounded-r ${
                adormantProps.onClick && "cursor-pointer"
              }  ${adormantProps.extraClasses}`
            )}
          >
            {adormant}
          </div>
        )}
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
  );
};

export default ATMInputAdormant;
