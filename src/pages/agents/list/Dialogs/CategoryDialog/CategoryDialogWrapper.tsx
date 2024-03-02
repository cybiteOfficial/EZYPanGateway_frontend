import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  useGetAllITRCategoriesListQuery,
  useGetAllPanCategoriesListQuery,
} from "src/services/CategoryDialogServices";
import { useUpdateUserCategoriesMutation } from "src/services/UserServices";
import { showToast } from "src/utils/toaster/showToast";
import CategoryDialog from "./CategoryDialog";

type Props = {
  onClose: () => void;
  distributorId: string;
  categories: {
    panCategories: string[];
    itrCategories: string[];
  };
};

export type FormInitialValues = {
  panCategories: string[];
  itrCategories: string[];
};

const CategoryDialogWrapper = ({
  onClose,
  distributorId,
  categories,
}: Props) => {
  // States
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [itrCategoyData, setItrCategoryData] = useState([]);

  //   Initial Values
  const initialValues: FormInitialValues = {
    panCategories: categories?.panCategories,
    itrCategories: categories?.itrCategories,
  };
  const { data, isFetching, isLoading } = useGetAllPanCategoriesListQuery("");
  const {
    data: itrCategoriesData,
    isFetching: isITRCategoriesFetching,
    isLoading: isITRCategoriesLoading,
  } = useGetAllITRCategoriesListQuery("");
  const [updateUserCategories] = useUpdateUserCategoriesMutation();

  // Setting Items
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      setCategoryData(data?.data || []);
    }
    if (!isITRCategoriesFetching && !isITRCategoriesLoading) {
      setItrCategoryData(itrCategoriesData?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoading,
    isFetching,
    data,
    itrCategoriesData,
    isITRCategoriesFetching,
    isITRCategoriesLoading,
  ]);

  // Tabs
  const tabs = [
    {
      label: "PAN",
      listItems: categoryData?.map((panCategory: any) => {
        return {
          name: panCategory?.categoryName,
          _id: panCategory?._id,
        };
      }),
    },

    {
      label: "ITR",
      listItems: itrCategoyData?.map((itrCategory: any) => {
        return {
          name: itrCategory?.categoryName,
          _id: itrCategory?._id,
        };
      }),
    },
  ];
  //   Handle Submit
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    updateUserCategories({ body: { category: values }, id: distributorId })
      .then((res: any) => {
        if (res.error) {
          showToast("error", res.data.error.message);
          setSubmitting(false);
        } else {
          showToast("success", res.data.message);
          setSubmitting(false);
          onClose();
        }
      })
      .catch(() => {});
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth onClose={onClose}>
      <div className="grid grid-cols-2 border-b ">
        {tabs.map((tab, tabIndex) => {
          const isTabActive = tabIndex === activeTabIndex;
          return (
            <button
              key={tabIndex}
              type="button"
              onClick={() => setActiveTabIndex(tabIndex)}
              className={`text-md  py-2 ${
                isTabActive
                  ? "border-b-[3px] border-primary-main text-primary-main"
                  : "text-slate-500"
              } `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formikProps) => (
            <Form>
              <CategoryDialog
                activeTabIndex={activeTabIndex}
                tabs={tabs}
                formikProps={formikProps}
                isLoading={
                  isFetching ||
                  isLoading ||
                  isITRCategoriesFetching ||
                  isITRCategoriesLoading
                }
                onClose={onClose}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialogWrapper;
