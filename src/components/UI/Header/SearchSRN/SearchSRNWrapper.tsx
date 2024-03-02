import { Form, Formik } from "formik";
import React from "react";
import SearchSrn from "./SearchSRN";
import { SelectOption } from "src/models/FormField/FormField.model";
import { useNavigate } from "react-router-dom";
import { setSearchValue as setDSCSearchValue } from "src/redux/slices/TabHistoryDSCApplicationSlice";
import { setSearchValue as setPanSearchValue } from "src/redux/slices/TabHistoryPanApplicationSlice";
import { setSearchValue as setITRSearchValue } from "src/redux/slices/TabHistoryITRApplicationSlice";
import { setSearchValue as setMSMESearchValue } from "src/redux/slices/TabHistoryMSMEApplicationSlice";
import { setSearchValue as setGumastaSearchValue } from "src/redux/slices/TabHistoryGumastaApplicationSlice";
import { useDispatch } from "react-redux";

export type SearchInitialValues = {
  srnNumber: string;
  service: string;
};
const services: SelectOption[] = [
  {
    label: "PAN",
    value: "pan",
  },
  {
    label: "ITR",
    value: "itr",
  },
  {
    label: "GUMASTA",
    value: "gumasta",
  },
  {
    label: "DSC",
    value: "dsc",
  },
  {
    label: "MSME",
    value: "msme",
  },
];
export type DropdownOptions = {
  services: SelectOption[];
};

const dropdownOptions: DropdownOptions = {
  services,
};
const SearchSRNWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues: SearchInitialValues = {
    srnNumber: "",
    service: "pan",
  };
  const navigateAndSetSRN = ({ srnNumber, service }: SearchInitialValues) => {
    switch (service) {
      case "pan":
        dispatch(setPanSearchValue(srnNumber));
        navigate("/history/pan");
        break;

      case "itr":
        dispatch(setITRSearchValue(srnNumber));
        navigate("/history/itr");
        break;

      case "msme":
        dispatch(setMSMESearchValue(srnNumber));
        navigate("/history/msme");
        break;
      case "gumasta":
        dispatch(setGumastaSearchValue(srnNumber));
        navigate("/history/gumasta");
        break;
      case "dsc":
        dispatch(setDSCSearchValue(srnNumber));
        navigate("/history/dsc");
        break;
    }
  };
  const onSubmit = ({ srnNumber, service }: SearchInitialValues) => {
    navigateAndSetSRN({ srnNumber, service });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => (
        <Form>
          <SearchSrn
            formikProps={formikProps}
            dropdownOptions={dropdownOptions}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchSRNWrapper;
