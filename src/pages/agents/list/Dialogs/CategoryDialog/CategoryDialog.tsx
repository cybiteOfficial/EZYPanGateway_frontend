import  CircularProgress  from "@mui/material/CircularProgress";
import { FormikProps } from "formik";
import React from "react";
import { BiCheck } from "react-icons/bi";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { FormInitialValues } from "./CategoryDialogWrapper";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  tabs: any[];
  formikProps: FormikProps<FormInitialValues>;
  activeTabIndex: number;
  isLoading: boolean;
  onClose: () => void;
};

const CategoryDialog = ({
  tabs,
  formikProps,
  activeTabIndex,
  isLoading,
  onClose,
}: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex justify-center items-center">
        <div className="relative flex flex-col justify-center items-center">
          <CircularProgress value={100} />
          <div className="">
            <div className="text-sm">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tabs[activeTabIndex].listItems?.map((item: any, itemIndex: any) => {
        return (
          <button
            type="button"
            key={itemIndex}
            onClick={() => {
              setFieldValue(
                tabs[activeTabIndex].label === "PAN"
                  ? "panCategories"
                  : "itrCategories",
                values[
                  tabs[activeTabIndex].label === "PAN"
                    ? "panCategories"
                    : "itrCategories"
                ].includes(item._id)
                  ? values[
                      tabs[activeTabIndex].label === "PAN"
                        ? "panCategories"
                        : "itrCategories"
                    ].filter((selected) => selected !== item._id)
                  : [
                      ...values[
                        tabs[activeTabIndex].label === "PAN"
                          ? "panCategories"
                          : "itrCategories"
                      ],
                      item._id,
                    ]
              );
            }}
            className="flex items-center gap-2"
          >
            <div
              className={`border  rounded w-4 h-4 flex justify-center items-center text-white transition-all duration-500 ${
                values[
                  tabs[activeTabIndex].label === "PAN"
                    ? "panCategories"
                    : "itrCategories"
                ]?.includes(item._id)
                  ? "bg-secondary-main border-slate-300"
                  : "border-slate-500"
              }`}
            >
              <BiCheck className="font-medium" />
            </div>

            <div> {item.name} </div>
          </button>
        );
      })}

      <div className="flex justify-end gap-3">
        <ATMLoadingButton
          className="border-primary-main text-primary-main bg-white"
          onClick={onClose}
        >
          Cancel
        </ATMLoadingButton>
        <AuthHOC
          moduleName="USERS"
          action={AccessAction.EDIT_CATEGORY_FOR_USER}
        >
          <ATMLoadingButton
            type="submit"
            isLoading={isSubmitting}
            className="bg-primary-main"
          >
            Update Category
          </ATMLoadingButton>
        </AuthHOC>
      </div>
    </div>
  );
};

export default CategoryDialog;
