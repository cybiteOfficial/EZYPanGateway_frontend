import React from "react";
import { ValidApplicationStatus } from "src/utils/ValidApplicationStatus";

type ForNormalAccessProps = {
  moduleName: string | string[];
  action?: string | string[];
  field?: string;
  children?: React.ReactNode;
  alt?: any;
  type?: "MODULE" | "ACTION" | "FIELD" | "MODULE_WISE_ACTION";
  resultType?: "BOOLEAN" | "CHILD";
  forApplicationStatus?: false;
  applicationName?: never;
  applicationStatus?: never;
  moduleWiseActions?: {
    moduleName: string;
    action: string;
  }[];
};
type ApplicationStatusAccessProps = {
  moduleName?: never;
  action?: never;
  field?: never;
  children?: React.ReactNode;
  alt?: any;
  type?: never;
  resultType?: "BOOLEAN" | "CHILD";
  forApplicationStatus: true;
  applicationName: string;
  applicationStatus: ValidApplicationStatus;
  moduleWiseActions?: never;
};

type Props = ForNormalAccessProps | ApplicationStatusAccessProps;

const AuthHOC = ({
  moduleName,
  action = "",
  field = "",
  children,
  alt,
  type = "ACTION",
  resultType = "CHILD",
  forApplicationStatus = false,
  applicationName,
  applicationStatus,
  moduleWiseActions,
}: Props) => {
  const userAccess = JSON.parse(localStorage.getItem("userAccess") || "{}");

  if (userAccess?.adminRoleGroupName === "SUPER_ADMIN") {
    return resultType === "BOOLEAN" ? true : children;
  } else {
    if (forApplicationStatus) {
      if (
        userAccess.applicationStatusAccess?.findIndex(
          (application: {
            applicationType: string;
            status: ValidApplicationStatus;
          }) => {
            return (
              application.applicationType === applicationName &&
              application.status === applicationStatus
            );
          }
        ) > -1
      ) {
        return resultType === "BOOLEAN" ? true : children;
      } else {
        return resultType === "BOOLEAN" ? false : alt || null;
      }
    } else {
      switch (type) {
        case "MODULE":
          if (typeof moduleName === "string") {
            if (
              userAccess?.accessModules?.findIndex(
                (module: any) => module?.moduleGroup === moduleName
              ) > -1
            ) {
              return resultType === "BOOLEAN" ? true : children;
            } else {
              return resultType === "BOOLEAN" ? false : alt || null;
            }
          } else {
            if (
              moduleName?.some(
                (moduleEle) =>
                  userAccess?.accessModules?.findIndex(
                    (module: any) => module?.moduleGroup === moduleEle
                  ) > -1
              )
            ) {
              return resultType === "BOOLEAN" ? true : children;
            } else {
              return resultType === "BOOLEAN" ? false : alt || null;
            }
          }

        case "ACTION":
          if (typeof action === "string") {
            if (
              userAccess?.accessModules
                ?.find((module: any) => module?.moduleGroup === moduleName)
                ?.actions?.includes(action)
            ) {
              return resultType === "BOOLEAN" ? true : children;
            } else {
              return resultType === "BOOLEAN" ? false : alt || null;
            }
          } else {
            if (
              action?.some((actionEle) =>
                userAccess?.accessModules
                  ?.find((module: any) => module?.moduleGroup === moduleName)
                  ?.actions?.includes(actionEle)
              )
            ) {
              return resultType === "BOOLEAN" ? true : children;
            } else {
              return resultType === "BOOLEAN" ? false : alt || null;
            }
          }

        case "FIELD":
          if (
            userAccess?.accessModules
              ?.find((module: any) => module?.moduleGroup === moduleName)
              ?.fields?.findIndex((currentField: any) => {
                return currentField?.fieldName === field;
              }) > -1
          ) {
            return resultType === "BOOLEAN" ? true : children;
          } else {
            return resultType === "BOOLEAN" ? false : alt || null;
          }

        case "MODULE_WISE_ACTION":
          if (
            moduleWiseActions?.some((moduleWiseAction) =>
              userAccess?.accessModules
                ?.find(
                  (module: any) =>
                    module?.moduleGroup === moduleWiseAction.moduleName
                )
                ?.actions?.includes(moduleWiseAction.action)
            )
          ) {
            return resultType === "BOOLEAN" ? true : children;
          } else {
            return resultType === "BOOLEAN" ? false : alt || null;
          }
      }
    }
  }
};

export default AuthHOC;
