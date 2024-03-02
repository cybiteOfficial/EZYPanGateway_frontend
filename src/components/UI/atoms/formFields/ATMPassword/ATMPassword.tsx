import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getInputHeight } from "src/utils/formUtils/getInputHeight";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
  extraClasses?: string;
  label?: string;
  inputProps?: {
    extraClasses?: string;
  };
  iconProps?: {
    extraClasses?: string;
  };
  size?: "small" | "medium" | "large";
} & Omit<React.ComponentProps<"input">, "size">;

const ATMPassword = ({
  name,
  extraClasses = "",
  label,
  inputProps,
  iconProps,
  size = "small",
  ...rest
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className=" font-medium text-primary-main text-sm">
          {" "}
          {label} {rest.required && <span className="text-red-500"> * </span>}{" "}
        </label>
      )}

      <div
        className={twMerge(
          `${getInputHeight(
            size
          )} flex items-center border border-slate-400 px-2 rounded mt-1 ${extraClasses} ${
            isFocussed && "border-2 border-primary-main"
          }`
        )}
      >
        <input
          name={name}
          type={isShowPassword ? "text" : "password"}
          className={twMerge(
            `border-0 outline-0 rounded h-full w-full ${inputProps?.extraClasses}`
          )}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
          {...rest}
        />

        <div
          onClick={() => setIsShowPassword((prev) => !prev)}
          className={twMerge(
            `text-xl text-slate-500 cursor-pointer ${iconProps?.extraClasses}`
          )}
        >
          {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
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

export default ATMPassword;
