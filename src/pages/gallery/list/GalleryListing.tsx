import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { GalleryCategoryListResponse } from "src/models/GalleryCategory.model";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetAllGalleryCategoryQuery } from "src/services/GalleryCategoryService";
import AddCategoryDialog from "./AddCategoryDialog/AddCategoryDialog";
import {
  setItems,
  setPage,
  setTotalItems,
} from "src/redux/slices/GallerySlice";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type ImageCardTypes = {
  imageUrl: string;
  title: string;
  id: string;
};

const ImageCard = ({ imageUrl, title, id }: ImageCardTypes) => {
  return (
    <div className="border shadow rounded p-2 flex flex-col gap-2">
      <img src={imageUrl} alt="" className="w-full h-[150px] rounded" />
      <div className=" text-slate-600 font-medium">{title}</div>
    </div>
  );
};
const LoaderCard = () => {
  return (
    <div className="border shadow rounded p-2 flex flex-col gap-2 animate-pulse">
      <div className="w-full h-[150px] rounded bg-slate-200"></div>
      <div className=" text-slate-600 font-medium w-full bg-slate-200 h-[20px]"></div>
    </div>
  );
};

type Props = {
  onCategoryClick: (categoryId: string) => void;
  galleryImageLoading: boolean;
};

const breadcrumbs: BreadcrumbType[] = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Gallery",
  },
];

const GalleryListing = React.memo(({ onCategoryClick }: Props) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpenAddCategoryDialog, setIsOpenAddCategoryDialog] = useState(false);
  const [galleryCategoryData, setgalleryCategoryData] = useState<
    GalleryCategoryListResponse[]
  >([]);

  const dispatch = useDispatch<AppDispatch>();
  const galleryListState: any = useSelector(
    (state: RootState) => state.gallery
  );

  const { page, totalItems, items, isTableLoading } = galleryListState;

  const {
    data: galleryCategory,
    isLoading: isLoadingGalleryCategory,
    isFetching: isFetchingGalleryCategory,
  } = useGetAllGalleryCategoryQuery("");

  useEffect(() => {
    if (!isFetchingGalleryCategory && !isLoadingGalleryCategory) {
      setgalleryCategoryData(galleryCategory?.data);
    }
  }, [galleryCategory, isLoadingGalleryCategory, isFetchingGalleryCategory]);

  useEffect(() => {
    onCategoryClick(
      galleryCategoryData?.length ? galleryCategoryData[activeIndex]?._id : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, galleryCategoryData]);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Breadcrumbs */}
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />

      {/* Page Header */}
      <div className="flex justify-end items-end gap-2">
        <AuthHOC moduleName="GALLERIES" action={AccessAction.ADD}>
          <ATMLoadingButton onClick={() => navigate("add")}>
            Add Gallery Image
          </ATMLoadingButton>
        </AuthHOC>
      </div>

      <div className="border flex flex-col grow overflow-auto rounded bg-white p-3">
        <div className="flex gap-3 h-full">
          <div className="bg-primary-dark h-full min-w-[200px] overflow-auto rounded  flex flex-col p-2">
            <div className="flex flex-col overflow-auto">
              {isFetchingGalleryCategory || isLoadingGalleryCategory
                ? Array(10)
                    .fill(null)
                    .map((_, index) => {
                      return (
                        <div
                          className="w-full h-[20px] bg-slate-300 animate-pulse rounded-sm mt-2 "
                          key={index}
                        ></div>
                      );
                    })
                : galleryCategoryData?.map((category, categoryIndex) => {
                    return (
                      <button
                        type="button"
                        key={category._id}
                        disabled={activeIndex === categoryIndex}
                        onClick={async () => {
                          await dispatch(setPage(1));
                          await dispatch(setItems([]));
                          await dispatch(setTotalItems(0));
                          setActiveIndex(categoryIndex);
                        }}
                        className={`font-medium text-sm text-start px-3 py-3 ${
                          activeIndex === categoryIndex
                            ? "text-white border-l-[3px]"
                            : "text-slate-400"
                        }`}
                      >
                        {category.title}
                      </button>
                    );
                  })}
            </div>

            <div className="flex justify-center py-2 h-[50px]">
              <button
                type="button"
                onClick={() => setIsOpenAddCategoryDialog(true)}
                className="text-sm text-white font-medium"
              >
                + Add Category
              </button>
            </div>
          </div>
          <AuthHOC
            moduleName="GALLERIES"
            action={AccessAction.VIEW_WITH_CATEGORIES}
            alt={<NotAuthorizedPage />}
          >
            <div
              id="scrollable-gallery-div"
              className="w-[calc(100%-160px)]  overflow-auto p-3  "
            >
              <InfiniteScroll
                dataLength={items.length || 0}
                next={() => {
                  handleLoadMore();
                }}
                scrollableTarget={"scrollable-gallery-div"}
                scrollThreshold={0.8}
                hasMore={items.length !== totalItems}
                loader={
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3 overflow-auto w-full mt-3">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <LoaderCard key={index} />
                      ))}
                  </div>
                }
              >
                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3 overflow-auto w-full">
                  {items.length
                    ? items.map((item: any, itemindex: number) => (
                        <ImageCard
                          key={itemindex}
                          imageUrl={item.image}
                          title={item.title}
                          id={item._id}
                        />
                      ))
                    : ""}
                </div>
              </InfiniteScroll>
              {!isTableLoading && !items.length && (
                <div className="text-center text-slate-500">
                  {" "}
                  No Images Found !{" "}
                </div>
              )}
            </div>
          </AuthHOC>
        </div>
      </div>
      {isOpenAddCategoryDialog && (
        <AddCategoryDialog onClose={() => setIsOpenAddCategoryDialog(false)} />
      )}
    </div>
  );
});

export default GalleryListing;
