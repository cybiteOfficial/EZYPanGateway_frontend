import React, { ReactNode } from "react";
import { FieldArray, FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { FooterLinksInitialValues } from "./AddFooterLinksWrapper";
import { IoImageOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import AuthHOC from "src/userAccess/AuthHOC";
import NotAuthorizedPage from "src/components/UI/NotAuthorized/NotAuthorizedPage";
import { AccessAction } from "src/utils/Enums/AccessAction";

type Props = {
  formikProps: FormikProps<FooterLinksInitialValues>;
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
    label: "Dashboard",
    path: "/",
    icon: IoPersonOutline,
  },
  {
    label: "Footer Links",
    icon: IoImageOutline,
  },
];

const AddFooterLinks = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <AuthHOC
      moduleName="FOOTER_CATEGORIES"
      action={AccessAction.LIST}
      alt={<NotAuthorizedPage />}
    >
      <div className="h-full py-5 px-4 flex flex-col gap-3 ">
        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
        <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative">
          <div className="grow overflow-auto ">
            {/* Footer Links */}
            <div className=" border-slate-200 pb-3 flex flex-col gap-2 ">
              <FormSectionHeading>Footer Links</FormSectionHeading>

              <FieldArray name="footerlinks">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-4">
                    {values.footerlinks?.map((footerLink, footerLinkIndex) => {
                      const { categoryName, order, links } = footerLink;

                      return (
                        <div
                          key={footerLinkIndex}
                          className="px-3 py-5 grid grid-cols-3 gap-5 shadow   border rounded relative"
                        >
                          {/* Category Name */}
                          <ATMTextField
                            name={`footerlinks[${footerLinkIndex}].categoryName`}
                            value={categoryName}
                            onChange={(e) => {
                              setFieldValue(
                                `footerlinks[${footerLinkIndex}].categoryName`,
                                e.target.value
                              );
                            }}
                            label="Category Name"
                            placeholder="Category Name"
                          />

                          {/* Order */}
                          <ATMTextField
                            type="number"
                            min={1}
                            name={`footerlinks[${footerLinkIndex}].order`}
                            value={`${order || ""}`}
                            onChange={(e) => {
                              setFieldValue(
                                `footerlinks[${footerLinkIndex}].order`,
                                e.target.value
                              );
                            }}
                            label="Order"
                            placeholder="Order"
                          />
                          <AuthHOC
                            moduleName="FOOTER_CATEGORIES"
                            action={AccessAction.DELETE}
                          >
                              {/* Delete Category */}
                            {values.footerlinks.length > 1 && (
                              <div className="flex justify-end items-end">
                                <button
                                  type="button"
                                  onClick={() => remove(footerLinkIndex)}
                                  className="bg-secondary-main  text-white rounded px-5 py-2 text-sm"
                                >
                                  Delete Category
                                </button>
                              </div>
                            )}

                            
                          </AuthHOC>

                          {/* Links */}
                          <div className="col-span-full mt-3 border-t pt-3">
                            <FieldArray
                              name={`footerlinks[${footerLinkIndex}].links`}
                            >
                              {({
                                push: pushLink,
                                remove: removeLink,
                                swap,
                              }) => (
                                <div>
                                  <div className="text-secondary-main text-lg font-medium">
                                    Links
                                  </div>
                                  <div
                                    className="flex flex-col gap-5"
                                    id="listId"
                                  >
                                    {links?.map((linkDetail, linkIndex) => {
                                      const { name, url } = linkDetail;
                                      return (
                                        <div
                                          key={linkIndex}
                                          className="grid grid-cols-3 gap-5"
                                          id={`list-id-${linkIndex}`}
                                        >
                                          {/* Name */}
                                          <ATMTextField
                                            name={`footerlinks[${footerLinkIndex}].links[${linkIndex}].name`}
                                            value={name}
                                            onChange={(e) => {
                                              setFieldValue(
                                                `footerlinks[${footerLinkIndex}].links[${linkIndex}].name`,
                                                e.target.value
                                              );
                                            }}
                                            label="Name"
                                            placeholder="Name"
                                          />

                                          {/* Link */}
                                          <ATMTextField
                                            name={`footerlinks[${footerLinkIndex}].links[${linkIndex}].url`}
                                            value={url}
                                            onChange={(e) => {
                                              setFieldValue(
                                                `footerlinks[${footerLinkIndex}].links[${linkIndex}].url`,
                                                e.target.value
                                              );
                                            }}
                                            label="Link"
                                            placeholder="Link"
                                          />

                                          {links.length > 1 && (
                                            <div className="flex gap-3 items-end">
                                              {/* Change List Order Buttons */}
                                              <div className="flex flex-col">
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    swap(
                                                      linkIndex,
                                                      linkIndex - 1
                                                    )
                                                  }
                                                  disabled={linkIndex === 0}
                                                  className={`${
                                                    linkIndex === 0
                                                      ? "text-slate-300"
                                                      : "text-slate-700"
                                                  }`}
                                                >
                                                  <BsFillCaretUpFill />
                                                </button>

                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    swap(
                                                      linkIndex,
                                                      linkIndex + 1
                                                    )
                                                  }
                                                  disabled={
                                                    linkIndex ===
                                                    links.length - 1
                                                  }
                                                  className={`${
                                                    linkIndex ===
                                                    links.length - 1
                                                      ? "text-slate-300"
                                                      : "text-slate-700"
                                                  }`}
                                                >
                                                  <BsCaretDownFill />
                                                </button>
                                              </div>

                                              {/* Delete Link Button */}
                                              <div className="flex items-end  ">
                                                <button
                                                  onClick={() => {
                                                    removeLink(linkIndex);
                                                  }}
                                                  className="bg-secondary-main w-[40px] rounded h-[40px]  text-xl  text-white flex justify-center items-center "
                                                >
                                                  <MdOutlineDelete />
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}

                                    <div className="grid grid-cols-3 mt-3">
                                      <div className="col-span-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            pushLink({
                                              name: "",
                                              link: "",
                                            });
                                          }}
                                          className={`px-6 py-2 border-2 border-dashed rounded border-blue-300 text-primary-main w-full font-medium flex justify-center gap-2 items-center`}
                                        >
                                          <HiOutlinePlus /> Add more links
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      );
                    })}

                    <div className="">
                      <button
                        type="button"
                        onClick={() => {
                          push({
                            categoryName: "",
                            order: null,
                            links: [
                              {
                                name: "",
                                link: "",
                              },
                            ],
                          });
                        }}
                        className={`px-6 py-2 border-2 border-dashed rounded border-blue-300 text-primary-main w-full font-medium flex justify-center gap-2 items-center h-[100px]`}
                      >
                        <HiOutlinePlus /> Add more categories
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>
          </div>
          <div className="flex justify-end  pt-2">
            <AuthHOC
               moduleName="FOOTER_CATEGORIES"
               action={AccessAction.EDIT}
            >
            <div>              
              <ATMLoadingButton type="submit" isLoading={isSubmitting}>
                Update
              </ATMLoadingButton>
            </div>
            </AuthHOC>
            
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default AddFooterLinks;
