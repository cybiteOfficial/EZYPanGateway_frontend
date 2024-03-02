import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { string, object } from "yup";
import Login from "./Login";
import { useLoginMutation } from "src/services/AuthService";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "src/utils/configs/AuthConfig";
import { showToast } from "src/utils/toaster/showToast";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setUserAccess,
} from "src/redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useGetuserAccessMutation } from "src/services/AdminServices";

export type LoginFormInitialValues = {
  userName: string;
  password: string;
};

const LoginWrapper = () => {
  const [getuserAccess] = useGetuserAccessMutation();

  // Service
  const [login] = useLoginMutation();

  // Dispatch
  const dispatch = useDispatch();

  // Navigate
  const navigate = useNavigate();

  // Form Initial Values
  const initialValues: LoginFormInitialValues = {
    userName: "",
    password: "",
  };

  // Form Validation Schema
  const validationSchema = object({
    userName: string().required("UserName is required"),
    password: string().required("Password is required"),
  });

  // Form Submit Handler
  const handleSubmit = (
    values: LoginFormInitialValues,
    { setSubmitting, setFieldError }: FormikHelpers<LoginFormInitialValues>
  ) => {
    setSubmitting(true);
    login(values).then((res: any) => {
      if (res.error) {
        showToast("error", res.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res.data?.status) {
          localStorage.setItem(authTokenKeyName, res.data?.token.accessToken);
          getuserAccess(res.data?.token.accessToken).then((userAccess: any) => {
            dispatch(setUserAccess(userAccess?.data?.data[0]));
            localStorage.setItem("userAccess",JSON.stringify(userAccess?.data?.data[0]));
          });
          localStorage.setItem(
            refreshTokenKeyName,
            res.data?.token.refreshToken
          );
          localStorage.setItem("userData", JSON.stringify(res.data?.data));
          dispatch(setAccessToken(res.data?.token.accessToken || null));
          dispatch(setRefreshToken(res.data?.token.refreshToken || null));
          navigate("/dashboard");
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="h-full">
          <Login formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default LoginWrapper;
