import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authTokenKeyName } from "src/utils/configs/AuthConfig";
import LoginWrapper from "../Login/LoginWrapper";

type Props = {};

const Auth = (props: Props) => {
  const navigate = useNavigate();
  const isTokenExist = localStorage.getItem(authTokenKeyName);

  useEffect(() => {
    if (isTokenExist) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenExist]);

  return <LoginWrapper />;
};

export default Auth;
