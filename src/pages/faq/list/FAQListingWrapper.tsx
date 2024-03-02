import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/FAQSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetFAQQuery } from "src/services/FAQService";
import FAQListing from "./FAQListing";

const FAQListingWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const faqState: any = useSelector((state: RootState) => state.faq);

  const { items, rowsPerPage, page, searchValue } = faqState;

  const { data, isLoading, isFetching } = useGetFAQQuery({
    limit: rowsPerPage,
    searchValue: searchValue,
    params: ["_id", "question", "answer", "createdAt", "updatedAt"],
    page: page,
    filterBy: [
      {
        fieldName: "",
        value: [],
      },
    ],
    dateFilter: {
      start_date: "",
      end_date: "",
      dateFilterKey: "",
    },
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true,
  });
  
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

  return (
    <>
      <SideNavLayout>
        <div className="h-full">
          <FAQListing items={items} isLoading={isLoading || isFetching} />
        </div>
      </SideNavLayout>
    </>
  );
};
export default FAQListingWrapper;
