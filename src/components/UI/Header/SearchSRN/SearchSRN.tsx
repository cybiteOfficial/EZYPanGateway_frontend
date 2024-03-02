import React from "react";
import ATMSelect from "../../atoms/formFields/ATMSelect/ATMSelect";
import ATMTextField from "../../atoms/formFields/ATMTextField/ATMTextField";
import ATMLoadingButton from "../../atoms/ATMLoadingButton/ATMLoadingButton";
import { FormikProps } from "formik";
import { DropdownOptions, SearchInitialValues } from "./SearchSRNWrapper";

type Props = {
  formikProps: FormikProps<SearchInitialValues>;
  dropdownOptions: DropdownOptions;
};
const SearchSrn = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue } = formikProps;
  return (
    <>
      <div className="flex  items-center gap-4  ">
        <div className="2xl:w-[120px]  xl:w-[120px]  sm:w-[120px]  xs:w-[80px]  pb-1">
          <ATMSelect
            value={values.service}
            onChange={(e) => {
              setFieldValue("service", e.target.value);
            }}
            options={dropdownOptions.services}
            name={"service"}
            size="small"
          />
        </div>
        <div className="2xl:w-[260px]  xl:w-[260px]  sm:w-[260px]  xs:w-[100px]">
          <ATMTextField
            name="srnNumber"
            value={values.srnNumber}
            onChange={(e) => setFieldValue("srnNumber", e.target.value.trim())}
            placeholder="Search SRN"
            size={30}
          />
        </div>
        <div className="2xl:w-[120px]  xl:w-[120px]  sm:w-[120px]  xs:w-[50px]">
          <ATMLoadingButton
            type="submit"
            className="bg-primary-main text-white text-[10px] 2xl:p-2 sm:p-2  xs:p-1"
          >
            Search
          </ATMLoadingButton>
        </div>
      </div>{" "}
    </>
  );
};

export default SearchSrn;
