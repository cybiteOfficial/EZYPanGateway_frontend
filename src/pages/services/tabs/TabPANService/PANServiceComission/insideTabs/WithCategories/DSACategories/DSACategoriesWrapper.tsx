import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PanCommissionListResponse } from "src/models/PANCommission.model";
import DSACategories from "./DSACategories";
import {
  useGetPanServiceCommissionViewQuery,
  useUpdatePanServiceCommissionMutation
} from "src/services/CommissionService";
import { Formik, Form, FormikHelpers } from "formik";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/PANCommissionSlice";
import { AppDispatch, RootState } from "src/redux/store";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { showToast } from "src/utils/toaster/showToast";
import AuthHOC from "src/userAccess/AuthHOC";
import { AccessAction } from "src/utils/Enums/AccessAction";

const AddPanCommissionValue = ({ commissionForDistributor, onSubmit }: any) => {
  const initialValues = {
    commissionForDistributor: commissionForDistributor.toString(),
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="p-2 flex  items-end gap-5 ">
            {/* Commission */}
            <ATMTextField
              type="number"
              name="commissionForDistributor"
              value={values.commissionForDistributor}
              onChange={(e) => {
                setFieldValue("commissionForDistributor", e.target.value);
              }}
              placeholder="Commission"
            />
            <AuthHOC
              moduleName="COMMISSIONS"
              action={AccessAction.EDIT}
            >
              <ATMLoadingButton
                type="submit"
                isLoading={isSubmitting}
                className="h-[40px]"
                loadingText="Updating"
              >
                Update
              </ATMLoadingButton>
            </AuthHOC>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const DSACategoriesWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const panCommissionState: any = useSelector(
    (state: RootState) => state.panCommission
  );
  const [updateCommission] = useUpdatePanServiceCommissionMutation();
  const { items } = panCommissionState;

  // const { data, isLoading, isFetching } =
  //   useGetServiceCommissionGetAllQuery("");

   const {data  ,  isLoading, isFetching}  = useGetPanServiceCommissionViewQuery({
    categoryType:"CAT_DSA"
})  
  // Setting Items
  React.useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setIsTableLoading(false));
      dispatch(setItems(data?.data || []));
      dispatch(setTotalItems(data?.totalItem || 0));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);
  const range = [
    {
      range: "01 TO 100",
      commissionName: items.find((item: any) => item.minimumApplications === 1 && item.serviceName === "PAN" )
        ?.commissionName,
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 1 && item.serviceName === "PAN")?.commissionForDistributor,
    },
    {
      range: "101 TO 200",
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 101 && item.serviceName === "PAN"
      )?.commissionForDistributor,
      commissionName: items.find(
        (item: any) => item.minimumApplications === 101 && item.serviceName === "PAN"
      )?.commissionName,
    },
    {
      commissionName: items.find(
        (item: any) => item.minimumApplications === 201 && item.serviceName === "PAN"
      )?.commissionName,
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 201 && item.serviceName === "PAN"
      )?.commissionForDistributor,
      range: "201 TO 300",
    },
    {
      commissionName: items.find(
        (item: any) => item.minimumApplications === 301 && item.serviceName === "PAN"
      )?.commissionName,
      range: "301 TO 500",
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 301 && item.serviceName === "PAN"
      )?.commissionForDistributor,
    },
    {
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 501 && item.serviceName === "PAN"
      )?.commissionForDistributor,
      commissionName: items.find(
        (item: any) => item.minimumApplications === 501 && item.serviceName === "PAN"
      )?.commissionName,
      range: "501  TO  850",
    },
    {
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 851 && item.serviceName === "PAN"
      )?.commissionForDistributor,
      commissionName: items.find(
        (item: any) => item.minimumApplications === 851 && item.serviceName === "PAN"
      )?.commissionName,
      range: "851  TO 1000",
    },
    {
      updatedCommissionForDistributor: items.find(
        (item: any) => item.minimumApplications === 1001 && item.serviceName === "PAN"
      )?.commissionForDistributor,
      commissionName: items.find(
        (item: any) => item.minimumApplications === 1001 && item.serviceName === "PAN"
      )?.commissionName,
      range: "Above 1001",
    },
  
  ];

  const columns: columnTypes[] = [
    {
      field: "range",
      headerName: "Range",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "commissionForDistributor",
      headerName: "Commission",
      flex: "flex-[2_2_0%]",
      align: "center",
      renderCell: (row: PanCommissionListResponse) => {
        const handleUpdate = (
          values: any,
          { setSubmitting }: FormikHelpers<any>
        ) => {
          updateCommission({
            body: { 
              categoryType:"CAT_DSA",
              commissionForDistributor: values.commissionForDistributor,
            },
            commissionName: row?.commissionName,
          }).then((res: any) => {
            if (res.error) {
              showToast("error", res.error.data.message);
              setSubmitting(false);
            } else {
              if (res.data?.status) {
                showToast("success", res.data.message);
                setSubmitting(false);
              } else {
                showToast("error", res?.data?.message);
                setSubmitting(false);
              }
            }
          });
        };
        return (
          <AddPanCommissionValue
            commissionForDistributor={
              row.updatedCommissionForDistributor || "101"
            }
            onSubmit={handleUpdate}
          />
        );
      },
    },
  ];
  return (
    <>
      <DSACategories
        columns={columns}
        rows={range}
      />
    </>
  );
};

export default DSACategoriesWrapper;
