import React, { ReactNode, useState, useEffect } from "react";
import { FormikProps } from "formik";
import ATMBreadCrumbs, {
  BreadcrumbType,
} from "src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import ATMTextField from "src/components/UI/atoms/formFields/ATMTextField/ATMTextField";
import { AddRoleInitialValues } from "./AddRoleWrapper";
import { IoImageOutline, IoPerson } from "react-icons/io5";
import { BiCheck, BiChevronUp, BiSearch } from "react-icons/bi";

type Props = {
  formikProps: FormikProps<AddRoleInitialValues>;
  modulesOptions: {
    moduleGroup: string;
    actions: string[];
    fields: {
      fieldName: string;
      displayName: string;
    }[];
  }[];
  isLoading: boolean;
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
    label: "Roles",
    path: "/roles",
    icon: IoPerson,
  },
  {
    label: "Create Role",
    icon: IoImageOutline,
  },
];

const checkboxClasses =
  "flex justify-center items-center h-4 w-4 rounded border border-slate-300 shadow font-bold transition-all";

const AddRole = ({ formikProps, modulesOptions, isLoading }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;
  const [searchValue, setSearchValue] = useState("");
  const [filteredModuleOptions, setFilteredModuleOptions] = useState<
    {
      moduleGroup: string;
      actions: string[];
      fields:
        | {
            fieldName: string;
            displayName: string;
          }[]
        | [];
    }[]
  >(modulesOptions);

  useEffect(() => {
    const filteredData = modulesOptions?.filter((module) =>
      module.moduleGroup
        ?.toLocaleLowerCase()
        .includes(searchValue?.toLocaleLowerCase())
    );
    setFilteredModuleOptions(filteredData);
  }, [searchValue, modulesOptions]);

  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3 ">
      <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="shadow-sm flex flex-col overflow-auto  border rounded p-3 bg-white relative h-full">
        <div className="grow overflow-auto">
          {/* Role Information */}
          <div className="h-full flex flex-col border-slate-200 pb-3">
            <FormSectionHeading>ROLE INFORMATION</FormSectionHeading>

            {/* Role Name */}
            <div className="py-3 grid grid-cols-3 ">
              {/* Role Name */}
              <ATMTextField
                name="roleName"
                value={values.roleName}
                onChange={(e) => {
                  setFieldValue("roleName", e.target.value);
                }}
                label="Role Name"
                placeholder="Role Name"
              />

              <div className="flex justify-end col-span-2">
                <div>
                  <ATMLoadingButton type="submit" isLoading={isSubmitting}>
                    Add Role
                  </ATMLoadingButton>
                </div>
              </div>
            </div>
            <div className="shadow border h-full  rounded overflow-auto flex flex-col gap-2">
              {/* Search */}
              <div className="flex px-3 py-3 border-b border-slate-300 shadow">
                <div className="border border-slate-400   rounded flex items-center p-1 hover:border-primary-main bg-slate-100">
                  <BiSearch className="text-slate-600 text-xl" />
                  <input
                    className="border-none rounded outline-none px-2 w-[250px] placeholder:text-slate-500 bg-slate-100"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="grow overflow-auto flex flex-col gap-2">
                {isLoading
                  ? Array(8)
                      .fill(null)
                      .map((_, skeletonIndex) => (
                        <div
                          key={skeletonIndex}
                          className="w-full h-[30px] bg-slate-200 animate-pulse"
                        ></div>
                      ))
                  : filteredModuleOptions?.map((module, moduleIndex) => {
                      let isModuleSelected =
                        values.modules?.findIndex(
                          (selectedModule) =>
                            selectedModule.moduleGroup === module.moduleGroup
                        ) > -1;

                      return (
                        <div key={moduleIndex}>
                          {/* Module */}
                          <div
                            onClick={() => {
                              if (
                                document
                                  .getElementById(`module-${moduleIndex}`)
                                  ?.classList.contains("hidden")
                              ) {
                                document
                                  .getElementById(`module-${moduleIndex}`)
                                  ?.classList.remove("hidden");
                                document
                                  ?.getElementById(`rotate-${moduleIndex}`)
                                  ?.classList?.remove(`rotate-180`);
                              } else {
                                document
                                  .getElementById(`module-${moduleIndex}`)
                                  ?.classList.add("hidden");
                                document
                                  ?.getElementById(`rotate-${moduleIndex}`)
                                  ?.classList?.add(`rotate-180`);
                              }
                            }}
                            className="px-2 bg-stone-100 font-medium text-sm text-slate-700 border-y border-slate-300 flex justify-between cursor-pointer"
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFieldValue(
                                  "modules",
                                  isModuleSelected
                                    ? values.modules?.filter(
                                        (selectedModule) =>
                                          selectedModule.moduleGroup !==
                                          module?.moduleGroup
                                      )
                                    : [...values.modules, module]
                                );
                              }}
                              className="flex gap-2 items-center py-1"
                            >
                              {/*Checkbox */}
                              <div
                                className={` ${checkboxClasses} ${
                                  isModuleSelected
                                    ? "bg-secondary-main text-white"
                                    : "bg-white"
                                }`}
                              >
                                {isModuleSelected && <BiCheck />}
                              </div>

                              <div className="text-[14px]">
                                {module?.moduleGroup.replaceAll("_", " ")}
                              </div>
                            </button>

                            {/* Expand/Collapse Button */}
                            <div
                              id={`rotate-${moduleIndex}`}
                              className="text-2xl transition-all duration-500 rotate-180 "
                            >
                              <BiChevronUp />
                            </div>
                          </div>

                          <div
                            id={`module-${moduleIndex}`}
                            className={`px-4 py-1 hidden`}
                          >
                            {/* Actions */}
                            <div>
                              <div className="text-primary-main font-medium">
                                Actions
                              </div>

                              <div className="py-1 grid grid-cols-4 px-2">
                                {module.actions?.map((action, actionIndex) => {
                                  let isActionSelected = values.modules
                                    ?.find(
                                      (selectedModule) =>
                                        selectedModule.moduleGroup ===
                                        module.moduleGroup
                                    )
                                    ?.actions?.includes(action);
                                  return (
                                    <button
                                      key={actionIndex}
                                      type="button"
                                      disabled={!isModuleSelected}
                                      onClick={() => {
                                        setFieldValue(
                                          "modules",
                                          values.modules?.map(
                                            (selectedModule) => {
                                              if (
                                                selectedModule.moduleGroup ===
                                                module.moduleGroup
                                              ) {
                                                return {
                                                  ...selectedModule,
                                                  actions:
                                                    selectedModule?.actions?.includes(
                                                      action
                                                    )
                                                      ? selectedModule.actions?.filter(
                                                          (selectedAction) =>
                                                            selectedAction !==
                                                            action
                                                        )
                                                      : [
                                                          ...selectedModule?.actions,
                                                          action,
                                                        ],
                                                };
                                              } else {
                                                return selectedModule;
                                              }
                                            }
                                          )
                                        );
                                      }}
                                      className="flex gap-2 items-center py-1"
                                    >
                                      {/*Checkbox */}
                                      <div
                                        className={`${checkboxClasses} ${
                                          isActionSelected
                                            ? "bg-secondary-main text-white"
                                            : "bg-white"
                                        }`}
                                      >
                                        {isActionSelected && <BiCheck />}
                                      </div>

                                      <div className="text-[12.5px] text-slate-600">
                                        {action.replaceAll("_", " ")}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Fields */}
                            {module?.fields?.length && (
                              <div>
                                <div className="text-primary-main font-medium">
                                  Fields
                                </div>

                                <div className="py-1 grid grid-cols-4 px-2">
                                  {module.fields?.map((field, fieldIndex) => {
                                    let isFieldSelected = values.modules
                                      ?.find(
                                        (selectedModule) =>
                                          selectedModule.moduleGroup ===
                                          module.moduleGroup
                                      )
                                      ?.fields?.find(
                                        (selectedField) =>
                                          selectedField.fieldName ===
                                          field.fieldName
                                      );
                                    return (
                                      <button
                                        key={fieldIndex}
                                        type="button"
                                        disabled={!isModuleSelected}
                                        onClick={() => {
                                          setFieldValue(
                                            "modules",
                                            values.modules?.map(
                                              (selectedModule) => {
                                                if (
                                                  selectedModule.moduleGroup ===
                                                  module.moduleGroup
                                                ) {
                                                  return {
                                                    ...selectedModule,
                                                    fields:
                                                      selectedModule?.fields?.findIndex(
                                                        (selectedField) =>
                                                          selectedField.fieldName ===
                                                          field.fieldName
                                                      ) > -1
                                                        ? selectedModule.fields?.filter(
                                                            (selectedField) =>
                                                              selectedField.fieldName !==
                                                              field.fieldName
                                                          )
                                                        : [
                                                            ...selectedModule?.fields,
                                                            field,
                                                          ],
                                                  };
                                                } else {
                                                  return selectedModule;
                                                }
                                              }
                                            )
                                          );
                                        }}
                                        className="flex gap-2 items-center py-1"
                                      >
                                        {/*Checkbox */}
                                        <div
                                          className={`${checkboxClasses} ${
                                            isFieldSelected
                                              ? "bg-secondary-main text-white"
                                              : "bg-white"
                                          }`}
                                        >
                                          {isFieldSelected && <BiCheck />}
                                        </div>

                                        <div className="text-[14px]">
                                          {field.displayName}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
