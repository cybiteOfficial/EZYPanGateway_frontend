import React from "react";
import  Link from "@mui/material/Link";
import { CgChevronDoubleRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export type BreadcrumbType = {
  label: string;
  onClick?: () => void;
  path?: string;
  icon?: IconType;
};

type Props = {
  breadcrumbs: BreadcrumbType[];
};

const ATMBreadCrumbs = ({ breadcrumbs }: Props) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      separator={
        <CgChevronDoubleRight className="text-xl text-secondary-main" />
      }
      aria-label="breadcrumb"
    >
      {breadcrumbs?.map((breadcrumb, breadcrumbIndex) => (
        <Link
          underline={breadcrumb.path ? "hover" : "none"}
          key={breadcrumbIndex}
          color="inherit"
          onClick={() => {
            breadcrumb.onClick && breadcrumb.onClick();
            breadcrumb.path && navigate(breadcrumb.path);
          }}
          className={`${breadcrumb.path && "cursor-pointer "}`}
        >
          <span
            className={`text-sm flex gap-2 items-center ${
              breadcrumb.path ? "" : "text-secondary-main"
            }`}
          >
            {/* {breadcrumb.icon && <breadcrumb.icon className="text-[18px]" />} */}
            {breadcrumb.label}
          </span>
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default ATMBreadCrumbs;
