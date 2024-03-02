import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTotalItems,
  setItems,
  setIsTableLoading,
} from "src/redux/slices/GallerySlice";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetAllGalleryImagesQuery } from "src/services/GalleryService";
import GalleryListing from "./GalleryListing";

const paramList = [
  "_id",
  "title",
  "category",
  "image",
  "description",
  "isDeleted",
  "isActive",
  "createdAt",
  "updatedAt",
];

const GalleryListingWrapper = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const galleryListState: any = useSelector(
    (state: RootState) => state.gallery
  );
  const { page, searchValue, items } = galleryListState;

  const { data, isFetching, isLoading } = useGetAllGalleryImagesQuery({
    limit: 20,
    searchValue: searchValue,
    params: paramList,
    page: page,
    filterBy: [
      {
        fieldName: "category",
        value: [selectedCategoryId],
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

  useEffect(() => {
    if (!isFetching && !isLoading) {
      dispatch(setItems([...items, ...(data?.data || [])]));
      dispatch(setTotalItems(data?.totalItem || 0));
      dispatch(setIsTableLoading(false));
    } else {
      dispatch(setIsTableLoading(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  useEffect(() => {
    dispatch(setItems([]));
    dispatch(setTotalItems(null));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SideNavLayout>
      <div className="h-full">
        <GalleryListing
          galleryImageLoading={isLoading || isFetching}
          onCategoryClick={(categoryId) => setSelectedCategoryId(categoryId)}
        />
      </div>
    </SideNavLayout>
  );
};

export default GalleryListingWrapper;
