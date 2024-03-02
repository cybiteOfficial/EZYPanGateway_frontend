import React from "react";
import { FormikProps } from "formik";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { FormInitialValues } from "./EditCategoriesPANServiceDialogWrapper";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onClose: () => void;
};

const EditCategoriesPANServiceDialog = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-8">
      <ATMTextField
        name="categoryName"
        value={values.categoryName}
        onChange={(e) => {
          setFieldValue("categoryName", e.target.value);
        }}
        label="Category Name"
        placeholder="Category Name"
      />
      <ATMTextField
        type="number"
        name="price"
        value={values.price?.toString()}
        onChange={(e) => {
          setFieldValue("price", e.target.value);
        }}
        label="Price"
        placeholder="Price"
      />

      <div className="flex justify-end gap-3">
        <ATMLoadingButton
          className="border-primary-main text-primary-main bg-white"
          onClick={onClose}
        >
          Cancel
        </ATMLoadingButton>
        <AuthHOC moduleName="PAN_CATEGORIES" action={AccessAction.EDIT}>
          <ATMLoadingButton
            type="submit"
            isLoading={isSubmitting}
            className="bg-primary-main"
          >
            Submit
          </ATMLoadingButton>
        </AuthHOC>
      </div>
    </div>
  );
};

export default EditCategoriesPANServiceDialog;
