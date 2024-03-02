import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import { GrGallery } from "react-icons/gr";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { DropdownOptions, GalleryInitialValues } from "./AddGalleryWrapper";
import { IoImageOutline } from "react-icons/io5";
import ATMSelect from "src/components/UI/atoms/formFields/ATMSelect/ATMSelect";
import ATMFilePickerWrapper from "src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper";

type Props = {
  formikProps: FormikProps<GalleryInitialValues>;
  dropdownOptions: DropdownOptions;
};

// Form Section Heading
const FormSectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-l-[3px] border-primary-main px-3 py-2 text-slate-700 font-medium text-[15px] sticky top-0 bg-white z-50">
      {children}
    </div>
  );
};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Gallery",
    path: "/gallery",
    icon: GrGallery,
  },
  {
    label: "Add Gallery Image",
    icon: IoImageOutline,
  },
];

const AddGallery = ({ formikProps, dropdownOptions }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3">
      {/* Breadcrumbs */}
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
        <div className="grow overflow-auto">
          {/* Image Information */}
          <div className="border-b border-slate-200 pb-3">
            <FormSectionHeading>IMAGE INFORMATION</FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              {/* Title */}
              <ATMTextField
                name="title"
                value={values.title}
                onChange={(e) => {
                  setFieldValue("title", e.target.value);
                }}
                label="Title"
                placeholder="Title"
              />

              {/* Description */}
              <ATMTextField
                name="description"
                value={values.description}
                onChange={(e) => {
                  setFieldValue("description", e.target.value);
                }}
                label="Description"
                placeholder="Description"
              />
              <div className="py-1">
                {/* Category */}
                <ATMSelect
                  name="category"
                  value={values.category}
                  onChange={(newValue) => {
                    setFieldValue("category", newValue);
                  }}
                  options={dropdownOptions.galleryCategoryOptions}
                  label="Category"
                  isSearch
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className=" border-slate-200 py-3 ">
            <FormSectionHeading> IMAGE </FormSectionHeading>

            <div className="px-3 py-5 grid grid-cols-3 gap-5">
              <ATMFilePickerWrapper
                name="image"
                selectedFile={values.image}
                onSelect={(newValue) => setFieldValue("image", newValue)}
                label="Image"
                placeholder="Select Image"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <ATMLoadingButton type="submit" isLoading={isSubmitting}>
              Add Image
            </ATMLoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
