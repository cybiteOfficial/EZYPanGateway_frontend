import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { LoginFormInitialValues } from "./LoginWrapper";
import ATMPassword from "src/components/UI/atoms/formFields/ATMPassword/ATMPassword";

type Props = {
  formikProps: FormikProps<LoginFormInitialValues>;
};

const Login = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-50 ">
      <div className="shadow rounded-2xl border py-10 px-10 w-[450px] bg-white ">
        <div className="text-2xl font-medium text-primary-main  mb-2 flex justify-center">
          <img src="/sjbtLogo.png" alt="" className="w-[50px] h-[50px]" />
        </div>

        <div className="text-2xl font-medium text-primary-main mb-5 flex justify-center">
          <img src="/name.gif" alt="" className="w-[140px]" />
        </div>
        <div className="text-2xl font-medium text-primary-main  mb-5 text-center">
          Login
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            {/* Username */}
            <ATMTextField
              name="userName"
              value={values.userName}
              onChange={(e) => {
                setFieldValue("userName", e.target.value);
              }}
              label="Username"
              placeholder="Username"
            />

            {/* Password */}
            <ATMPassword
              name="password"
              value={values.password}
              onChange={(e) => {
                setFieldValue("password", e.target.value);
              }}
              label="Password"
              placeholder="Password"
            />
          </div>

          <div>
            <ATMLoadingButton
              isLoading={isSubmitting}
              type="submit"
              loadingText="Login"
            >
              Login
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
