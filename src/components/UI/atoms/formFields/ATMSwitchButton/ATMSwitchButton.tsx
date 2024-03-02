import React from "react";
import { ErrorMessage } from "formik";

type Props = {
  label?: string;
  required?: boolean;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const ATMSwitchButton = ({
  label,
  name,
  required = false,
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative">
      {label && (
        <label className=" font-medium text-primary-main text-sm">
          {" "}
          {label} {required && <span className="text-red-500"> * </span>}{" "}
        </label>
      )}

      <div className={`${label && "mt-1"} h-[40px] flex items-center`}>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className="flex justify-between min-w-[150px] text-sm rounded bg-slate-200 shadow"
        >
          <div
            className={`${
              value
                ? "bg-secondary-main  text-white rounded shadow-lg"
                : "rounded-r"
            } flex-1 py-1 h-full transition-all duration-500`}
          >
            YES
          </div>
          <div
            className={`${
              !value
                ? " bg-secondary-main text-white rounded shadow-lg"
                : "rounded-r"
            } flex-1 py-1 h-full transition-all duration-500`}
          >
            NO
          </div>
        </button>
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

export default ATMSwitchButton;
