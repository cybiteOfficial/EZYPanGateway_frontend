import { IconType } from "react-icons";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { URLSearchParamsInit } from "react-router-dom";
import { switchToAuthModule } from "./utils/auth/switchToAuthModule";
import { AccessAction } from "./utils/Enums/AccessAction";
import { TbExchangeOff } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuUserPlus } from "react-icons/lu"; 
import { FaUser } from "react-icons/fa";
type NavItemTypeWithoutChild = {
  label: string;
  path: string | undefined;
  icon: IconType;
  badge?: string | number;
  children?: never;
  searchParams?: URLSearchParamsInit;
  moduleName?: string | string[];
  type?: "MODULE" | "ACTION" | "FIELD" | "MODULE_WISE_ACTION";
  accessAction?: string | string[];
  moduleWiseActions?: {
    moduleName: string;
    action: string;
  }[];
};

type NavItemTypeWithChild = {
  label: string;
  path?: never;
  icon: IconType;
  badge?: never;
  searchParams?: URLSearchParamsInit;
  moduleName?: string | string[];
  type?: "MODULE" | "ACTION" | "FIELD" | "MODULE_WISE_ACTION";
  accessAction?: string | string[];
  moduleWiseActions?: {
    moduleName: string;
    action: string;
  }[];

  children: {
    label: string;
    path: string | undefined;
    icon: IconType;
    badge?: string | number;
    searchParams?: URLSearchParamsInit;
    moduleName?: string | string[];
    type?: "MODULE" | "ACTION" | "FIELD" | "MODULE_WISE_ACTION";
    accessAction?: string | string[];
    moduleWiseActions?: {
      moduleName: string;
      action: string;
    }[];
  }[];
};

export type NavItemType = NavItemTypeWithChild | NavItemTypeWithoutChild;

export type PendingApplicationCountType = {
  totaldscapplications: number;
  totalgumastaapplications: number;
  totalitrapplications: number;
  totalmsmeapplications: number;
  totalpanapplications: number;
};

export const navigation: (
  pendingApplicationCount: PendingApplicationCountType
) => NavItemType[] = (pendingApplicationCount: PendingApplicationCountType) => {
  return [
    {
      label: "Dashboard",
      icon: RxDashboard,
      path: "/dashboard",
    },
    {
      label: "Distributors",
      moduleName: "DISTRIBUTORS",
      icon: FiUser,
      path: "/distributor",
    },
    {
      label: "Retailers",
      moduleName: "RETAILERS",
      icon: FiUser,
      path: "/retailer",
    },
    {
      label: "Guests",
      moduleName: "GUESTS",
      icon: FiUser,
      path: "/guest",
    },
    {
      label: "Ledger",
      moduleName: ["COMMISSIONS", "REWARDS", "REFUND_WALLET_TRANSACTIONS"],
      icon: FiUser,
      path: switchToAuthModule([
        { moduleName: "COMMISSIONS", path: "/ledger/commission" },
        { moduleName: "REWARDS", path: "/ledger/reward" },
        {
          moduleName: "REFUND_WALLET_TRANSACTIONS",
          path: "/ledger/refund-balance",
        },
      ]),
    },

    {
      label: "Applications",
      moduleName: [
        "PAN_APPLICATIONS",
        "ITR_APPLICATIONS",
        "GUMASTA_APPLICATIONS",
        "DSC_APPLICATIONS",
        "MSME_APPLICATIONS",
        "STC_DIGITAL_PAN",
      ],

      icon: RxDashboard,
      children: [
        {
          label: "PAN",
          moduleName: "PAN_APPLICATIONS",
          icon: RxDashboard,
          path: switchToAuthModule([
            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_PENDNG_APP,
              path: "/pan/PENDING",
            },
            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_IN_PROGRESS_APP,
              path: "/pan/IN_PROGRESS",
            },
            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_REJECTED_APP,
              path: "/pan/REJECT",
            },
            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_VERIFIED_APP,
              path: "/pan/VERIFY",
            },

            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_GENERATED_APP,
              path: "/pan/GENERATE",
            },
            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_DONE_APP,
              path: "/pan/DONE",
            },
            {
              moduleName: "PAN_APPLICATIONS",
              action: AccessAction.SHOW_CANCELLED_APP,
              path: "/pan/CANCELLED",
            },
          ]),
          badge: pendingApplicationCount?.totalpanapplications,
        },
        {
          label: "ITR",
          moduleName: "ITR_APPLICATIONS",
          icon: RxDashboard,
          path: switchToAuthModule([
            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_PENDNG_APP,
              path: "/itr/PENDING",
            },
            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_IN_PROGRESS_APP,
              path: "/itr/IN_PROGRESS",
            },
            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_REJECTED_APP,
              path: "/itr/REJECT",
            },
            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_VERIFIED_APP,
              path: "/itr/VERIFY",
            },

            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_GENERATED_APP,
              path: "/itr/GENERATE",
            },
            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_DONE_APP,
              path: "/itr/DONE",
            },
            {
              moduleName: "ITR_APPLICATIONS",
              action: AccessAction.SHOW_CANCELLED_APP,
              path: "/itr/CANCELLED",
            },
          ]),
          badge: pendingApplicationCount?.totalitrapplications,
        },
        {
          label: "Gumasta",
          moduleName: "GUMASTA_APPLICATIONS",
          icon: RxDashboard,
          path: switchToAuthModule([
            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_PENDNG_APP,
              path: "/gumasta/PENDING",
            },
            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_IN_PROGRESS_APP,
              path: "/gumasta/IN_PROGRESS",
            },
            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_REJECTED_APP,
              path: "/gumasta/REJECT",
            },
            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_VERIFIED_APP,
              path: "/gumasta/VERIFY",
            },

            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_GENERATED_APP,
              path: "/gumasta/GENERATE",
            },
            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_DONE_APP,
              path: "/gumasta/DONE",
            },
            {
              moduleName: "GUMASTA_APPLICATIONS",
              action: AccessAction.SHOW_CANCELLED_APP,
              path: "/gumasta/CANCELLED",
            },
          ]),
          badge: pendingApplicationCount?.totalgumastaapplications,
        },
        {
          label: "DSC(Digital Signature)",
          moduleName: "DSC_APPLICATIONS",
          icon: RxDashboard,
          path: switchToAuthModule([
            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_PENDNG_APP,
              path: "/dsc/PENDING",
            },
            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_IN_PROGRESS_APP,
              path: "/dsc/IN_PROGRESS",
            },
            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_REJECTED_APP,
              path: "/dsc/REJECT",
            },
            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_VERIFIED_APP,
              path: "/dsc/VERIFY",
            },

            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_GENERATED_APP,
              path: "/dsc/GENERATE",
            },
            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_DONE_APP,
              path: "/dsc/DONE",
            },
            {
              moduleName: "DSC_APPLICATIONS",
              action: AccessAction.SHOW_CANCELLED_APP,
              path: "/dsc/CANCELLED",
            },
          ]),
          badge: pendingApplicationCount?.totaldscapplications,
        },
        {
          label: "MSME Udhyog Adhar",
          moduleName: "MSME_APPLICATIONS",
          icon: RxDashboard,
          path: switchToAuthModule([
            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_PENDNG_APP,
              path: "/msme/PENDING",
            },
            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_IN_PROGRESS_APP,
              path: "/msme/IN_PROGRESS",
            },
            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_REJECTED_APP,
              path: "/msme/REJECT",
            },
            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_VERIFIED_APP,
              path: "/msme/VERIFY",
            },

            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_GENERATED_APP,
              path: "/msme/GENERATE",
            },
            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_DONE_APP,
              path: "/msme/DONE",
            },
            {
              moduleName: "MSME_APPLICATIONS",
              action: AccessAction.SHOW_CANCELLED_APP,
              path: "/msme/CANCELLED",
            },
          ]),
          badge: pendingApplicationCount?.totalmsmeapplications,
        },
        {
          label: "Digital PAN",
           moduleName: "DIGITAL_PAN_APPLICATIONS",
          icon: RxDashboard,
          path: "/digital-pan", 
      
        },
      ],
    },
    {
      label: "Enquiries",
      moduleName: [
        "LOAN_ENQUIRIES",
        "BUSINESS_ENQUIRIES",
        "CONTACT_US_ENQUIRIES",
      ],
      icon: RxDashboard,
      children: [
        {
          label: "Loan Enquiry",
          moduleName: "LOAN_ENQUIRIES",
          icon: RxDashboard,
          path: "/loan-enquiry",
        },
        {
          label: "Business Enquiry",
          moduleName: "BUSINESS_ENQUIRIES",
          icon: RxDashboard,
          path: "/business-enquiry",
        },
        {
          label: "Contact Us Enquiry",
          moduleName: "CONTACT_INFOS",
          icon: RxDashboard,
          path: "/contact-us-enquiry",
        },
      ],
    },
    {
      label: "CMS",
      moduleName: [
        "GALLERIES",
        "BANNERS",
        "POPUP_BANNERS",
        "VIDEOS",
        "VIDEO_TUTORIALS",
        "MENU_LINKS",
        "CONTACT_INFOS",
        "FOOTER_CATEGORIES",
        "FAQS",
        "TERMS_AND_CONDITIONS",
        "PRIVACY_POLICIES",
        "REFUND_AND_CANCELLATIONS",
        "DOWNLOAD_FILES",
        "BUSINESS_OPPORTUNITIES",
        "OTHER_SERVICES",
        "STATIC_PAGES",
      ],
      icon: RxDashboard,
      children: [
        {
          label: "Gallery",
          moduleName: "GALLERIES",
          icon: RxDashboard,
          path: "/gallery",
        },
        {
          label: "Banner",
          moduleName: "BANNERS",
          icon: RxDashboard,
          path: "/banner",
        },
        {
          label: "Pop-up Banner",
          moduleName: "POPUP_BANNERS",
          icon: RxDashboard,
          path: "/pop-up-banner",
        },
        {
          label: "Videos",
          moduleName: ["VIDEOS", "VIDEO_TUTORIALS"],
          icon: RxDashboard,
          path: "/videos/app-videos",
        },
        {
          label: "Menu Links",
          moduleName: "MENU_LINKS",
          icon: RxDashboard,
          path: "/menu-links",
        },
        {
          label: "Contact Information",
          moduleName: "CONTACT_INFOS",
          icon: RxDashboard,
          path: "/contact-information",
        },
        {
          label: "Footer Links",
          moduleName: "FOOTER_CATEGORIES",
          icon: RxDashboard,
          path: "/footer-links",
        },
        {
          label: "FAQ",
          moduleName: "FAQS",
          icon: RxDashboard,
          path: "/faq",
        },
        {
          label: "Terms & Conditions",
          moduleName: "TERMS_AND_CONDITIONS",
          icon: RxDashboard,
          path: "/terms-condition",
        },
        {
          label: "Privacy Policy",
          moduleName: "PRIVACY_POLICIES",
          icon: RxDashboard,
          path: "/privacy-policy",
        },
        {
          label: "Refund Policy",
          moduleName: "REFUND_AND_CANCELLATIONS",
          icon: RxDashboard,
          path: "/refund-policy",
        },
        {
          label: "Download Forms",
          moduleName: "DOWNLOAD_FILES",
          icon: RxDashboard,
          path: "/download-form",
        },
        {
          label: "Business Oppurtunity",
          moduleName: "BUSINESS_OPPORTUNITIES",
          icon: RxDashboard,
          path: "/business-opportunity",
        },
        {
          label: "Other Services",
          moduleName: "OTHER_SERVICES",
          icon: RxDashboard,
          path: "/other-services",
        },
        {
          label: "Static Pages",
          moduleName: "STATIC_PAGES",
          icon: RxDashboard,
          path: "/static-page",
        },
      ],
    },
    {
      label: "Manage Admins",
      moduleName: ["ADMINS", "ADMIN_ROLES"],
      icon: RiUserSettingsLine,
      children: [
        {
          label: "Admin",
          moduleName: "ADMINS",
          icon: LuUserPlus,
          path: "/admins",
        },
        {
          label: "Roles",
          moduleName: "ADMIN_ROLES",
          icon: FaUser,
          path: "/roles",
        },
      ],
    },
    {
      label: "Configuration",
      moduleName: [
        "PAN_CATEGORIES",
        "REWARDS",
        "ITR_CATEGORIES",
        "COMMISSIONS",
        "SUBSCRIPTIONS",
        "CITY_CODES",
        "REJECTION_LISTS",
        "REWARD_POINTS",
        "PRICE_CONFIGS",
        "RETAILER_REGISTER_REWARDS",
      ],
      icon: RxDashboard,
      children: [
        {
          label: "Services",
          moduleName: [
            "PAN_CATEGORIES",
            "ITR_CATEGORIES",
            "COMMISSIONS",
            "REWARDS",
          ],
          icon: RxDashboard,
          path: "/services/PAN/categories",
        },
        {
          label: "Subscription",
          moduleName: "SUBSCRIPTIONS",
          icon: RxDashboard,
          path: "/subscription",
        },
        {
          label: "Gumasta Location",
          moduleName: "GUMASTA_CONFIGURATION",
          icon: RxDashboard,
          path: "/gumastaConfiguration",
        },
        {
          label: "AO Code List",
          moduleName: "CITY_CODES",
          icon: RxDashboard,
          path: "/ao-code-list",
        },
        {
          label: "Rejection List",
          moduleName: "REJECTION_LISTS",
          icon: RxDashboard,
          path: "/rejection-list",
        },
        {
          label: "Reward Point Value",
          moduleName: "REWARD_POINTS",
          icon: RxDashboard,
          path: "/reward-point-value",
        },
        {
          label: "Base Price",
          moduleName: "PRICE_CONFIGS",
          icon: RxDashboard,
          path: "/base-price",
        },
        {
          label: "New Registration Reward",
          moduleName: "RETAILER_REGISTER_REWARDS",
          icon: RxDashboard,
          path: "/new-registration-reward",
        },
      ],
    },
    {
      label: "Refund Request",
      moduleName: "REFUND_REQUESTS",
      icon: FiUser,
      path: "/refund-request",
    },
    {
      label: "History",
      moduleName: [
        "PAN_APPLICATIONS",
        "ITR_APPLICATIONS",
        "MSME_APPLICATIONS",
        "GUMASTA_APPLICATIONS",
        "DSC_APPLICATIONS",
      ],
      icon: FiUser,
      path: switchToAuthModule([
        {
          moduleName: "PAN_APPLICATIONS",
          action: AccessAction.HISTORY,
          path: "/history/pan",
        },
        {
          moduleName: "ITR_APPLICATIONS",
          action: AccessAction.HISTORY,
          path: "/history/itr",
        },
        {
          moduleName: "MSME_APPLICATIONS",
          action: AccessAction.HISTORY,
          path: "/history/msme",
        },
        {
          moduleName: "GUMASTA_APPLICATIONS",
          action: AccessAction.HISTORY,
          path: "/history/gumasta",
        },
        {
          moduleName: "DSC_APPLICATIONS",
          action: AccessAction.HISTORY,
          path: "/history/dsc",
        },
      ]),
    },
    {
      label: "Payment Failed",
      icon: FiUser,
      type: "MODULE_WISE_ACTION",
      moduleWiseActions: [
        {
          moduleName: "PAN_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
        },
        {
          moduleName: "ITR_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
        },
        {
          moduleName: "MSME_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
        },
        {
          moduleName: "GUMASTA_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
        },
        {
          moduleName: "DSC_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
        },
      ],
      path: switchToAuthModule([
        {
          moduleName: "PAN_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
          path: "/payment_failed/pan",
        },
        {
          moduleName: "ITR_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
          path: "/payment_failed/itr",
        },
        {
          moduleName: "MSME_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
          path: "/payment_failed/msme",
        },
        {
          moduleName: "GUMASTA_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
          path: "/payment_failed/gumasta",
        },
        {
          moduleName: "DSC_APPLICATIONS",
          action: AccessAction.SHOW_FAILED_PAYMENTS,
          path: "/payment_failed/dsc",
        },
      ]),
    },
    {
      label: "Reports",
      icon: FiUser,
      moduleName: "ADMINS",
      type: "ACTION",
      accessAction: [
        AccessAction.ADMIN_REPORTS,
        AccessAction.DISTRIBUTOR_REPORTS,
        AccessAction.RETAILER_REPORTS,
      ],

      children: [
        {
          label: "Admin Report",
          type: "ACTION",
          moduleName: "ADMINS",
          accessAction: AccessAction.ADMIN_REPORTS,
          icon: RxDashboard,
          path: "/admin-report",
        },
        {
          label: "Distributor Report",
          type: "ACTION",
          moduleName: "ADMINS",
          accessAction: AccessAction.DISTRIBUTOR_REPORTS,
          icon: RxDashboard,
          path: "/distributor-report",
        },
        {
          label: "Retailer Report",
          type: "ACTION",
          moduleName: "ADMINS",
          accessAction: AccessAction.RETAILER_REPORTS,
          icon: RxDashboard,
          path: "/retailer-report",
        },
      ],
    },
    {
      label: "Payment Detail",
      icon: FiUser,
       type: "MODULE_WISE_ACTION",
       moduleWiseActions: [
        {
          moduleName: "PAN_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
        },
        {
          moduleName: "ITR_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
        },
        {
          moduleName: "MSME_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
        },
        {
          moduleName: "GUMASTA_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
        },
        {
          moduleName: "DSC_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
        },
      ],
      path: switchToAuthModule([
        {
          moduleName: "PAN_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
          path: "/payment-detail/pan",
        },
        {
          moduleName: "ITR_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
          path: "/payment-detail/itr",
        },
        {
          moduleName: "MSME_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
          path: "/payment-detail/msme",
        },
        {
          moduleName: "GUMASTA_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
          path: "/payment-detail/gumasta",
        },
        {
          moduleName: "DSC_APPLICATIONS",
          action: AccessAction.SHOW_PAYMENTS_DETAILS,
          path: "/payment-detail/dsc",
        },
      ]),
    },
    {
      label: "Change Password",
      moduleName: "ADMINS",
      type: "ACTION",
      accessAction: AccessAction.ADMIN_CHANGE_PASSWORD,
      icon: TbExchangeOff,
      path: "/change-password",
    },
  ];
};
