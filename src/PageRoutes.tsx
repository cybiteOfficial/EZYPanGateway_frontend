import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAdminWrapper from "./pages/admin/add/AddAdminWrapper";
import AdminListingWrapper from "./pages/admin/list/AdminListingWrapper";
import DistributorListingWrapper from "./pages/agents/list/DistributorListingWrapper";
import TabDisributorApplicationWrapper from "./pages/agents/view/tabs/application-tab/TabDistributorApplicationWrapper";
import TabDistributorLedgerWrapper from "./pages/agents/view/tabs/ledger/TabDistributorLedgerWrapper";
import TabDistributorLogWrapper from "./pages/agents/view/tabs/log-tab/TabDistributorLogWrapper";
import TabDistrbutorProfileWrapper from "./pages/agents/view/tabs/profile/TabDistrbutorProfileWrapper";
import TabDisributorRetailerWrapper from "./pages/agents/view/tabs/retailer-tab/TabDistributorRetailerWrapper";
import ViewAgent from "./pages/agents/view/ViewAgent";
import Auth from "./pages/Auth/Auth";
import AddBannerWrapper from "./pages/banner-update/add/AddBannerWrapper";
import BannerUpdateListingWrapper from "./pages/banner-update/list/BannerUpdateListingWrapper";
import AddBPLCodeWrapper from "./pages/bpl-code-list/add/AddAOCodeWrapper";
import BusinessEnquiryListingWrapper from "./pages/business-enquiry/list/BusinessEnquiryListingWrapper";
import EditChangePasswordWrapper from "./pages/change-password/edit/EditChangePasswordWrapper";
import AddContactInformationWrapper from "./pages/contact-information/add/AddContactInformationWrapper";
import DashboardListingWrapper from "./pages/dashboard/list/DashboardListingWrapper";
import DSCListingWrapper from "./pages/dsc/list/DSCListingWrapper";
import AddFooterLinksWrapper from "./pages/footer-links/add/AddFooterLinksWrapper";
import AddGalleryWrapper from "./pages/gallery/add/AddGalleryWrapper";
import GuestListingWrapper from "./pages/guest/list/GuestListingWrapper";
import TabGuestApplicationWrapper from "./pages/guest/view/tabs/application-tab/TabGuestApplicationWrapper";
import ViewGuest from "./pages/guest/view/ViewGuest";
import GumastaListingWrapper from "./pages/gumasta/list/GumastaListingWrapper";
import ViewGumastaCardApplicationWrapper from "./pages/gumasta/view/ViewGumastaApplicationWrapper";
import ITRListingWrapper from "./pages/itr/list/ITRListingWrapper";
import ViewItrCardApplicationWrapper from "./pages/itr/view/ViewItrCardApplicationWrapper";
import LedgerListingWrapper from "./pages/ledger/list/LedgerListingWrapper";
import TabComissionListWrapper from "./pages/ledger/list/tabs/TabComissionListing/list/TabCommissionListWrapper";
import TabRefundBalanceListWrapper from "./pages/ledger/list/tabs/TabRefundBalance/list/TabRefundBalanceListWrapper";
import TabRewardListWrapper from "./pages/ledger/list/tabs/TabRewardListing/list/TabRewardListWrapper";
import LoanEnquiryListingWrapper from "./pages/loan-enquiry/list/LoanEnquiryListingWrapper";
import LoginWrapper from "./pages/Login/LoginWrapper";
import AddMenuLinksWrapper from "./pages/menu-links/add/AddMenuLinksWrapper";
import MenuLinksListingWrapper from "./pages/menu-links/list/MenuLinksListingWrapper";
import MSMEListingWrapper from "./pages/msme/list/MSMEListingWrapper";
import ViewMsmeCardApplicationWrapper from "./pages/msme/view/ViewMsmeApplicationWrapper";
import ViewPanCardApplicationWrapper from "./pages/pan/view/ViewPanCardApplicationWrapper";
import RefundRequestListingWrapper from "./pages/refund-request/list/RefundRequestListingWrapper";
import AddRejectionListWrapper from "./pages/rejection-list/add/AddRejectionListWrapper";
import RejectionListingWrapper from "./pages/rejection-list/list/RejectionListingWrapper";
import AddRewardPointValueWrapper from "./pages/reward-point-value/add/AddRewardPointValueWrapper";
import AddRoleWrapper from "./pages/roles/add/AddRoleWrapper";
import RolesListingWrapper from "./pages/roles/list/RolesListingWrapper";
import ServicesWrapper from "./pages/services/ServicesWrapper";
import AddITRServiceCategoriesWrapper from "./pages/services/tabs/TabITRService/ITRServiceCategories/add/AddITRServiceCategoriesWrapper";
import ITRServiceCategoriesWrapperListing from "./pages/services/tabs/TabITRService/ITRServiceCategories/list/ITRServiceCategoriesListingWrapper";
import TabITRServiceWrapper from "./pages/services/tabs/TabITRService/TabITRServiceWrapper";
import RetailerListingWrapper from "./pages/sub-agents/list/RetailerListingWrapper";
import TabRetailerApplicationWrapper from "./pages/sub-agents/view/tabs/application-tab/TabRetailerApplicationWrapper";
import TabRetailerLogWrapper from "./pages/sub-agents/view/tabs/log-tab/TabRetailerLogWrapper";
import TabRetailerProfileWrapper from "./pages/sub-agents/view/tabs/profile/TabRetailerProfileWrapper";
import ViewRetailer from "./pages/sub-agents/view/ViewRetailer";
import SubscriptionListingWrapper from "./pages/subscription/list/SubscriptionListingWrapper";
import AddUserWrapper from "./pages/user-access/add/AddUserWrapper";
import UserAccessListingWrapper from "./pages/user-access/list/UserAccessWrapper";
import AddAppVideoWrapper from "./pages/video/list/tabs/TabAppVideoListing/add/AddAppVideoWrapper";
import TabAppVideoListWrapper from "./pages/video/list/tabs/TabAppVideoListing/list/TabAppVideoListWrapper";
import AddTutorialVideoWrapper from "./pages/video/list/tabs/TabTutorialVideo/add/AddTutorialVideoWrapper";
import TabTutorialVideoListWrapper from "./pages/video/list/tabs/TabTutorialVideo/list/TabTutorialVideoListWrapper";
import VideoListWrapper from "./pages/video/list/VideoListWrapper";
import TabDistributorApplicationDSCListWrapper from "./pages/agents/view/tabs/application-tab/inside-tabs/TabDistributorApplicationDSC/TabDistributorApplicationDSCListWrapper";
import TabDistributorApplicationGumastaListWrapper from "./pages/agents/view/tabs/application-tab/inside-tabs/TabDistributorApplicationGumasta/TabDistributorApplicationGumastaListWrapper";
import TabDistributorApplicationITRListWrapper from "./pages/agents/view/tabs/application-tab/inside-tabs/TabDistributorApplicationITR/TabDistributorApplicationITRListWrapper";
import TabDistributorApplicationMSMEListWrapper from "./pages/agents/view/tabs/application-tab/inside-tabs/TabDistributorApplicationMSME/TabDistributorApplicationMSMEListWrapper";
import TabDistributorApplicationPANListWrapper from "./pages/agents/view/tabs/application-tab/inside-tabs/TabPANApplication/TabDistributorApplicationPAN/TabDistributorApplicationPANListWrapper";
import HistoryListingWrapper from "./pages/history/list/HistoryListingWrapper";
import TabHistoryApplicationGumastaListingWrapper from "./pages/history/list/tabs/TabGumastaHistory/list/TabHistoryApplicationGumastaListingWrapper";
import TabHistoryApplicationITRListingWrapper from "./pages/history/list/tabs/TabITRHistory/list/TabHistoryApplicationITRListingWrapper";
import TabHistoryApplicationDSCListingWrapper from "./pages/history/list/tabs/TabDSCHistory/list/TabHistoryApplicationDSCListingWrapper";
import TabHistoryApplicationMSMEListingWrapper from "./pages/history/list/tabs/TabMSMEHistory/list/TabHistoryApplicationMSMEListingWrapper";
import TabHistoryApplicationPANListingWrapper from "./pages/history/list/tabs/TabPANHistory/list/TabPANHistoryListingWrapper";
import TabGuestApplicationPANListingWrapper from "./pages/guest/view/tabs/application-tab/inside-tabs/TabGuestApplicationPAN/list/TabGuestApplicationPANListingWrapper";
import TabGuestDSCApplicationListingWrapper from "./pages/guest/view/tabs/application-tab/inside-tabs/TabGuestDSCApplication/list/TabGuestDSCApplicationListingWrapper";
import TabGuestITRApplicationListingWrapper from "./pages/guest/view/tabs/application-tab/inside-tabs/TabGuestITRApplication/TabGuestITRApplicationListingWrapper";
import TabGuestApplicationMSMEListingWrapper from "./pages/guest/view/tabs/application-tab/inside-tabs/TabGuestApplicationMSME/list/TabGuestApplicationMSMEListingWrapper";
import TabGuestApplicationGumastaListingWrapper from "./pages/guest/view/tabs/application-tab/inside-tabs/TabGuestApplicationGumasta/list/TabGuestApplicationGumastaListingWrapper";
import TabGuestApplicationDigitalPANListingWrapper from "./pages/guest/view/tabs/application-tab/inside-tabs/TabGuestApplicationDigitalPAN/list/TabGuestApplicationDigitalPANListingWrapper";
import TabRetailerApplicationDSCListingWrapper from "./pages/sub-agents/view/tabs/application-tab/inside-tabs/TabRetailerApplicationDSC/list/TabRetailerApplicationDSCListingWrapper";
import TabRetailerApplicationITRListingWrapper from "./pages/sub-agents/view/tabs/application-tab/inside-tabs/TabRetailerApplicationITR/list/TabRetailerApplicationITRListingWrapper";
import TabRetailerApplicationPANListingWrapper from "./pages/sub-agents/view/tabs/application-tab/inside-tabs/TabRetailerApplicationPAN/list/TabRetailerApplicationPANListingWrapper";
import TabRetailerApplicationGumastaListingWrapper from "./pages/sub-agents/view/tabs/application-tab/inside-tabs/TabRetailerApplicationGumasta/list/TabRetailerApplicationGumastaListingWrapper";
import TabRetailerApplicationMSMEListingWrapper from "./pages/sub-agents/view/tabs/application-tab/inside-tabs/TabRetailerApplicationMSME/list/TabRetailerApplicationMSMEListingWrapper";
import TabRetailerApplicationDigitalPANListingWrapper from "./pages/sub-agents/view/tabs/application-tab/inside-tabs/TabRetailerApplicationDigitalPAN/list/TabRetailerApplicationDigitalPANListingWrapper";
import GalleryListingWrapper from "./pages/gallery/list/GalleryListingWrapper";
import AddPopUpBannerWrapper from "./pages/pop-up-banner/add/AddPopUpBannerWrapper";
import ViewDSCApplicationWrapper from "./pages/dsc/view/ViewDSCApplicationWrapper";
import TabPANServiceWrapper from "./pages/services/tabs/TabPANService/TabPANServiceWrapper";
import TabGumastaServiceWrapper from "./pages/services/tabs/TabGumastaService/TabGumastaServiceWrapper";
import TabMSMEServiceWrapper from "./pages/services/tabs/TabMSMEService/TabMSMEServiceWrapper";
import TabDSCServiceWrapper from "./pages/services/tabs/TabDSCService/TabDSCServiceWrapper";
import FAQListingWrapper from "./pages/faq/list/FAQListingWrapper";
import AddFAQWrapper from "./pages/faq/add/AddFAQWrapper";
import BasePriceListingWrapper from "./pages/base-price/list/BasePriceListingWrapper";
import DistributorTabCommissionListWrapper from "./pages/agents/view/tabs/ledger/inner-tab/TabComissionListing/list/DistributorTabCommissionListWrapper";
import DistributorTabRefundBalanceListWrapper from "./pages/agents/view/tabs/ledger/inner-tab/TabRefundBalance/list/DistributorTabRefundBalanceListWrapper";
import DistributorTabRewardListWrapper from "./pages/agents/view/tabs/ledger/inner-tab/TabRewardListing/list/DistributorTabRewardListWrapper";
import TabRetailerLedgerWrapper from "./pages/sub-agents/view/tabs/ledger/TabRetailerLedgerWrapper";
import RetailerTabRefundBalanceListWrapper from "./pages/sub-agents/view/tabs/ledger/inner-tab/TabRefundBalance/list/RetailerTabRefundBalanceListWrapper";
import RetailerTabRewardListWrapper from "./pages/sub-agents/view/tabs/ledger/inner-tab/TabRewardListing/list/RetailerTabRewardListWrapper";
import EditAppVideoWrapper from "./pages/video/list/tabs/TabAppVideoListing/edit/EditAppVideoWrapper";
import EditTutorialVideoWrapper from "./pages/video/list/tabs/TabTutorialVideo/edit/EditTutorialVideoWrapper";
import EditBannerWrapper from "./pages/banner-update/edit/EditBannerWrapper";
import EditMenuLinkWrapper from "./pages/menu-links/edit/EditMenuLinkWrapper";
import EditFAQWrapper from "./pages/faq/edit/EditFAQWrapper";
import EditRejectionListWrapper from "./pages/rejection-list/edit/EditRejectionListWrapper";
import AOCodeListingWrapper from "./pages/bpl-code-list/list/AOCodeListingWrapper";
import EditAoCodeWrapper from "./pages/bpl-code-list/edit/EditAoCodeWrapper";
import EditSubscriptionWrapper from "./pages/subscription/edit/EditSubscriptionWrapper";
import PANServiceCategoriesListingWrapper from "./pages/services/tabs/TabPANService/PANServiceCategories/list/PANServiceCategoriesListingWrapper";
import EditAdminWrapper from "./pages/admin/edit/EditAdminWrapper";
import TermsAndConditionsListingWrapper from "./pages/terms-and-conditions/list/TermsAndConditionsListingWrapper";
import ContactUsEnquiryListingWrapper from "./pages/contactEnquiry/list/ContactUsEnquiryListingWrapper";
import TabGuestLogWrapper from "./pages/guest/view/tabs/log-tab/TabGuestLogWrapper";
import EditRoleWrapper from "./pages/roles/edit/EditRoleWrapper";
import AdminReportListingWrapper from "./pages/reports/adminReport/list/AdminReportListingWrapper";
import DistributorReportListingWrapper from "./pages/reports/distributorReport/list/DistributorReportListingWrapper";
import RetailerReportListingWrapper from "./pages/reports/retailerReport/list/RetailerReportListingWrapper";
import PrivacyAndPolicyWrapper from "./pages/privacyPolicy/list/PrivacyAndPolicyWrapper";
import RefundPolicyWrapper from "./pages/refundPolicy/list/RefundPolicyWrapper";
import DownLoadsFormWrapper from "./pages/download-form/list/DownLoadsFormWrapper";
import EditDownLoadFormWrapper from "./pages/download-form/edit/EditDownLoadFormWrapper";
import AddDownLoadFormWrapper from "./pages/download-form/add/AddDownLoadFormWrapper";
import ListBusinessOppurtunityWrapper from "./pages/businessOppurtunity/list/ListBusinessOppurtunityWrapper";
import EditBusinessOpportunityWrapper from "./pages/businessOppurtunity/edit/EditBusinessOpportunityWrapper";
import OtherServicesListingWrapper from "./pages/otherServices/list/OtherServicesListingWrapper";
import EditOtherServiceWrapper from "./pages/otherServices/edit/EditOtherServiceWrapper";
import AddOtherServicesWrapper from "./pages/otherServices/add/AddOtherServicesWrapper";
import StaticPagesWrapper from "./pages/static-pages/list/StaticPagesWrapper";
import AddStaticPagesWrapper from "./pages/static-pages/add/AddStaticPagesWrapper";
import EditStaticPageWrapper from "./pages/static-pages/edit/EditStaticPagesWrapper";
import TabSubscriptionPlanHistoryWrapper from "./pages/agents/view/tabs/subscription_plan_history/TabSubscriptionPlanHistoryWrapper";
import AuthHOC from "./userAccess/AuthHOC";
import NotAuthorizedPage from "./components/UI/NotAuthorized/NotAuthorizedPage";
import EditPanServiceRewardListingWrapper from "./pages/services/tabs/TabPANService/PANServiceReward/edit/EditPANServiceRewardListingWrapper";
import EditDSCServiceRewardListingWrapper from "./pages/services/tabs/TabDSCService/DSCServiceReward/edit/EditDSCServiceRewardListingWrapper";
import EditITRServiceListingWrapper from "./pages/services/tabs/TabITRService/ITRServiceReward/edit/EditITRServiceListingWrapper";
import EditGumastaServiceRewardListingWrapper from "./pages/services/tabs/TabGumastaService/GumastaServiceReward/edit/EditGumastaServiceRewardListingWrapper";
import EditMSMEServiceRewardListingWrapper from "./pages/services/tabs/TabMSMEService/MSMEServiceReward/edit/EditMSMEServiceRewardListingWrapper";
import AddItrCommissionValueWrapper from "./pages/services/tabs/TabITRService/ITRServiceComission/add/AddItrCommissionValueWrapper";
import AddGumastaCommissionValueWrapper from "./pages/services/tabs/TabGumastaService/GumastaServiceComission/add/AddGumastaCommissionValueWrapper";
import AddMsmeCommissionValueWrapper from "./pages/services/tabs/TabMSMEService/MSMEServiceCommission/add/AddMsmeCommissionValueWrapper";
import AddDscCommissionValueWrapper from "./pages/services/tabs/TabDSCService/DSCServiceCommission/add/AddDscCommissionValueWrapper";
import PanCommissionWrapper from "./pages/services/tabs/TabPANService/PANServiceComission/PanCommissionWrapper";
import AddPanCommissionValueWrapper from "./pages/services/tabs/TabPANService/PANServiceComission/insideTabs/WithoutCategories/add/AddPanCommissionValueWrapper";
import AddNewRegistrationValueWrapper from "./pages/new_registration_reward/add/AddNewRegistrationValueWrapper";
import RetailerTabCommissionListWrapper from "./pages/sub-agents/view/tabs/ledger/inner-tab/TabComissionListing/list/RetailerTabCommissionListWrapper";
import PANListingWrapper from "./pages/pan/list/PANListingWrapper";
import PANPendingApplicationListingWrapper from "./pages/pan/list/StatusWiseTabs/PANPendingApplications/PANPendingApplicationListingWrapper";
import PANInProgressApplicationListingWrapper from "./pages/pan/list/StatusWiseTabs/PANInProgressApplications/PANInProgressApplicationListingWrapper";
import PANVerifyApplicationListingWrapper from "./pages/pan/list/StatusWiseTabs/PANVerifyApplications/PANVerifyApplicationListingWrapper";
import PANGenerateApplicationListingWrapper from "./pages/pan/list/StatusWiseTabs/PANGenerateApplications/PANGenerateApplicationListingWrapper";
import PANDoneApplicationListingWrapper from "./pages/pan/list/StatusWiseTabs/PANDoneApplications/PANDoneApplicationListingWrapper";
import ITRPendingApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRPendingApplications/ITRPendingApplicationListingWrapper";
import ITRInProgressApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRInProgressApplications/ITRInProgressApplicationListingWrapper";
import ITRGenerateApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRGenerateApplications/ITRGenerateApplicationListingWrapper";
import ITRDoneApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRDoneApplications/ITRDoneApplicationListingWrapper";
import ITRRejectApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRRejectApplications/ITRRejectApplicationListingWrapper";
import ITRVerifyApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRVerifyApplications/ITRVerifyApplicationListingWrapper";
import ITRCancelledApplicationListingWrapper from "./pages/itr/list/StatusWiseTabs/ITRCancelledApplications/ITRCancelledApplicationListingWrapper";
import GumastaPendingApplicationListingWrapper from "./pages/gumasta/list/StatusWiseTabs/GumastaPendingApplications/GumastaPendingApplicationListingWrapper";
import GumastaInProgressApplicationListingWrapper from "./pages/gumasta/list/StatusWiseTabs/GumastaInProgressApplications/GumastaInProgressApplicationListingWrapper";
import GumastaRejectedApplicationListingWrapper from "./pages/gumasta/list/StatusWiseTabs/GumastaRejectedApplications/GumastaRejectedApplicationListingWrapper";
import GumastaVerifiedApplicationListingWrapper from "./pages/gumasta/list/StatusWiseTabs/GumastaVerifiedApplications/GumastaVerifiedApplicationListingWrapper";
import GumastaCancelledApplicationListingWrapper from "./pages/gumasta/list/StatusWiseTabs/GumastaCancelledApplications/GumastaCancelledApplicationListingWrapper";
import DSCPendingApplicationListingWrapper from "./pages/dsc/list/statusWiseTabs/DSCPendingApplication/DSCPendingApplicationWrapper";
import DSCInProgressApplicationWrapper from "./pages/dsc/list/statusWiseTabs/DSCInProgreesApplication/DSCInProgressApplicationWrapper";
import DSCRejectApplicationWrapper from "./pages/dsc/list/statusWiseTabs/DSCRejectApplication/DSCRejectApplicationWrapper";
import DSCVerifyApplicationWrapper from "./pages/dsc/list/statusWiseTabs/DSCVerifyApplication/DSCVerifyApplicationWrapper";
import DSCCancelledApplicationWrapper from "./pages/dsc/list/statusWiseTabs/DSCCancelledApplication/DSCCancelledApplicationWrapper";
import MSMEPendingApplicationWrapper from "./pages/msme/list/statusWiseTabs/MSMEPendingApplication/MSMEPendingApplicationWrapper";
import MSMEInProgressApplicationWrapper from "./pages/msme/list/statusWiseTabs/MSMEInProgressApplication/MSMEInProgressApplicationWrapper";
import MSMERejectApplicationWrapper from "./pages/msme/list/statusWiseTabs/MSMERejectApplication/MSMERejectApplicationWrapper";
import MSMEVerifyApplicationWrapper from "./pages/msme/list/statusWiseTabs/MSMEVerifyApplication/MSMEVerifyApplicationWrapper";
import MSMECancelledApplicationListingWrapper from "./pages/msme/list/statusWiseTabs/MSMECancelledApplications/MSMECancelledApplicationListingWrapper";
import { AccessAction } from "./utils/Enums/AccessAction";
import FailedPaymentWrapper from "./pages/FailedPayments/list/FailedPaymentWrapper";
import TabFailedPaymentPanApplicationListingWrapper from "./pages/FailedPayments/list/Tabs/TabFailedPaymentPanApplicationListing/TabFailedPaymentPanApplicationListingWrapper";
import TabFailedPaymentITRApplicationListingWrapper from "./pages/FailedPayments/list/Tabs/TabFailedPaymentITRApplicationListing/TabFailedPaymentITRApplicationListingWrapper";
import TabFailedPaymentDSCApplicationListingWrapper from "./pages/FailedPayments/list/Tabs/TabFailedPaymentDSCApplicationListing/TabFailedPaymentDSCApplicationListingWrapper";
import TabFailedPaymentGumastaApplicationListingWrapper from "./pages/FailedPayments/list/Tabs/TabFailedPaymentGumastaApplicationListing/TabFailedPaymentGumastaApplicationListingWrapper";
import TabFailedPaymentMSMEApplicationListingWrapper from "./pages/FailedPayments/list/Tabs/TabFailedPaymentMSMEApplicationListing/TabFailedPaymentMSMEApplicationListingWrapper";
import DigitalPanListingWrapper from "./pages/digital-pan/list/DigitalPanListingWrapper";
import TabDistributorApplicationDigitalPanListWrapper from "./pages/agents/view/tabs/application-tab/inside-tabs/TabDistributorApplicationDigitalPan/TabDistributorApplicationDigitalPanListWrapper";
import TabPaymentDSCApplicationListingWrapper from "./pages/payment-detail/edit/Tabs/TabPaymentDetailDSCApplicationListing/TabPaymentDetailDSCApplicationListingWrapper";
import TabPaymentDetailGumastaApplicationListingWrapper from "./pages/payment-detail/edit/Tabs/TabPaymentDetailGumastaApplicationListing/TabPaymentDetailGumastaApplicationListingWrapper";
import TabPaymentDetailITRApplicationListingWrapper from "./pages/payment-detail/edit/Tabs/TabPaymentDetailITRApplicationListing/TabPaymentDetailITRApplicationListingWrapper";
import TabPaymentDetailMSMEApplicationListingWrapper from "./pages/payment-detail/edit/Tabs/TabPaymentDetailMSMEApplicationListing/TabPaymentDetailMSMEApplicationListingWrapper";
import TabPaymentDetailPanApplicationListingWrapper from "./pages/payment-detail/edit/Tabs/TabPaymentDetailPanApplicationListing/TabPaymentDetailPanApplicationListingWrapper";
import PaymentDetailWrapper from "./pages/payment-detail/edit/PaymentDetailWrapper";
import ChangePasswordWrapper from "./pages/admin/changePassword/ChangePasswordWrapper";
import PCOCategoriesWrapper from "./pages/services/tabs/TabPANService/PANServiceComission/insideTabs/WithCategories/PCOCategories/PCOCategoriesWrapper";
import DSACategoriesWrapper from "./pages/services/tabs/TabPANService/PANServiceComission/insideTabs/WithCategories/DSACategories/DSACategoriesWrapper";
import GumastaConfigurationWrapper from "./pages/gumastaConfiguration/list/GumastaConfigurationWrapper";
const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/distributor" element={<DistributorListingWrapper />} />
          <Route path="/distributor/:distributorId" element={<ViewAgent />}>
            <Route
              path="applications"
              element={<TabDisributorApplicationWrapper />}
            >
              <Route
                path="pan"
                element={
                  <AuthHOC
                    moduleName="PAN_APPLICATIONS"
                    type="MODULE"
                    alt={<NotAuthorizedPage />}
                  >
                    <TabDistributorApplicationPANListWrapper />{" "}
                  </AuthHOC>
                }
              />
              <Route
                path="itr"
                element={
                  <AuthHOC
                    moduleName="ITR_APPLICATIONS"
                    type="MODULE"
                    alt={<NotAuthorizedPage />}
                  >
                    <TabDistributorApplicationITRListWrapper />{" "}
                  </AuthHOC>
                }
              />
              <Route
                path="gumasta"
                element={
                  <AuthHOC
                    moduleName="GUMASTA_APPLICATIONS"
                    type="MODULE"
                    alt={<NotAuthorizedPage />}
                  >
                    <TabDistributorApplicationGumastaListWrapper />{" "}
                  </AuthHOC>
                }
              />
              <Route
                path="dsc"
                element={
                  <AuthHOC
                    moduleName="DSC_APPLICATIONS"
                    type="MODULE"
                    alt={<NotAuthorizedPage />}
                  >
                    <TabDistributorApplicationDSCListWrapper />{" "}
                  </AuthHOC>
                }
              />
              <Route
                path="msme"
                element={
                  <AuthHOC
                    moduleName="MSME_APPLICATIONS"
                    type="MODULE"
                    alt={<NotAuthorizedPage />}
                  >
                    <TabDistributorApplicationMSMEListWrapper />{" "}
                  </AuthHOC>
                }
              />
              <Route
                path="digital-pan"
                element={<TabDistributorApplicationDigitalPanListWrapper />}
              />
            </Route>
            <Route
              path="retailers"
              element={<TabDisributorRetailerWrapper />}
            />
            <Route
              path="subscription-history"
              element={<TabSubscriptionPlanHistoryWrapper />}
            />
            <Route path="ledger" element={<TabDistributorLedgerWrapper />}>
              <Route
                path="commission"
                element={<DistributorTabCommissionListWrapper />}
              />
              <Route
                path="refund-balance"
                element={<DistributorTabRefundBalanceListWrapper />}
              />
              <Route
                path="reward"
                element={<DistributorTabRewardListWrapper />}
              />
            </Route>
            <Route path="log" element={<TabDistributorLogWrapper />} />
            <Route path="profile" element={<TabDistrbutorProfileWrapper />} />
          </Route>
          <Route path="/retailer" element={<RetailerListingWrapper />} />
          <Route path="/guest" element={<GuestListingWrapper />} />
          <Route path="/retailer/:retailerId" element={<ViewRetailer />}>
            <Route
              path="applications"
              element={<TabRetailerApplicationWrapper />}
            >
              <Route
                path="pan"
                element={<TabRetailerApplicationPANListingWrapper />}
              />
              <Route
                path="itr"
                element={<TabRetailerApplicationITRListingWrapper />}
              />
              <Route
                path="gumasta"
                element={<TabRetailerApplicationGumastaListingWrapper />}
              />
              <Route
                path="dsc"
                element={<TabRetailerApplicationDSCListingWrapper />}
              />
              <Route
                path="msme"
                element={<TabRetailerApplicationMSMEListingWrapper />}
              />
              <Route
                path="digital-pan"
                element={<TabRetailerApplicationDigitalPANListingWrapper />}
              />
            </Route>
            <Route path="ledger" element={<TabRetailerLedgerWrapper />}>
              <Route
                path="commission"
                element={<RetailerTabCommissionListWrapper />}
              />
              <Route
                path="refund-balance"
                element={<RetailerTabRefundBalanceListWrapper />}
              />
              <Route path="reward" element={<RetailerTabRewardListWrapper />} />
            </Route>
            <Route path="profile" element={<TabRetailerProfileWrapper />} />
            <Route path="ledger" element={"Ledger"} />
            <Route path="log" element={<TabRetailerLogWrapper />} />
          </Route>
          <Route path="/guest/:guestId" element={<ViewGuest />}>
            <Route path="applications" element={<TabGuestApplicationWrapper />}>
              <Route
                path="pan"
                element={<TabGuestApplicationPANListingWrapper />}
              />
              <Route
                path="itr"
                element={<TabGuestITRApplicationListingWrapper />}
              />
              <Route
                path="gumasta"
                element={<TabGuestApplicationGumastaListingWrapper />}
              />
              <Route
                path="dsc"
                element={<TabGuestDSCApplicationListingWrapper />}
              />
              <Route
                path="msme"
                element={<TabGuestApplicationMSMEListingWrapper />}
              />
              <Route
                path="digital-pan"
                element={<TabGuestApplicationDigitalPANListingWrapper />}
              />
            </Route>
            <Route></Route>
            <Route path="log" element={<TabGuestLogWrapper />} />
            <Route path="profile" element={<TabRetailerProfileWrapper />} />
          </Route>
          <Route path="/user-access" element={<UserAccessListingWrapper />} />
          <Route path="/user-access/add" element={<AddUserWrapper />} />
          <Route
            path="/other-services"
            element={<OtherServicesListingWrapper />}
          />
          <Route
            path="/other-services/:otherServiceId/edit"
            element={<EditOtherServiceWrapper />}
          />
          <Route
            path="/other-services/add"
            element={<AddOtherServicesWrapper />}
          />
          <Route path="/pan" element={<PANListingWrapper />}>
            <Route
              path="PENDING"
              element={<PANPendingApplicationListingWrapper />}
            />
            <Route
              path="IN_PROGRESS"
              element={<PANInProgressApplicationListingWrapper />}
            />
            <Route
              path="VERIFY"
              element={<PANVerifyApplicationListingWrapper />}
            />
            <Route
              path="GENERATE"
              element={<PANGenerateApplicationListingWrapper />}
            />
            <Route path="DONE" element={<PANDoneApplicationListingWrapper />} />
          
          </Route>
          <Route
            path="/pop-up-banner"
            element={
              <AuthHOC
                moduleName="POPUP_BANNERS"
                type="MODULE"
                action={AccessAction.LIST}
              >
                <AddPopUpBannerWrapper />{" "}
              </AuthHOC>
            }
          />
          <Route
            path="/pan/:panApplicationId"
            element={<ViewPanCardApplicationWrapper />}
          />
          <Route path="/itr" element={<ITRListingWrapper />}>
            <Route
              path="PENDING"
              element={<ITRPendingApplicationListingWrapper />}
            />
            <Route
              path="IN_PROGRESS"
              element={<ITRInProgressApplicationListingWrapper />}
            />
            <Route
              path="REJECT"
              element={<ITRRejectApplicationListingWrapper />}
            />
            <Route
              path="VERIFY"
              element={<ITRVerifyApplicationListingWrapper />}
            />
            <Route
              path="GENERATE"
              element={<ITRGenerateApplicationListingWrapper />}
            />
            <Route path="DONE" element={<ITRDoneApplicationListingWrapper />} />
            <Route
              path="CANCELLED"
              element={<ITRCancelledApplicationListingWrapper />}
            />
          </Route>
          <Route
            path="/itr/:itrApplicationId"
            element={<ViewItrCardApplicationWrapper />}
          />
          <Route path="/gumasta" element={<GumastaListingWrapper />}>
            <Route
              path="PENDING"
              element={<GumastaPendingApplicationListingWrapper />}
            />
            <Route
              path="IN_PROGRESS"
              element={<GumastaInProgressApplicationListingWrapper />}
            />
            <Route
              path="REJECT"
              element={<GumastaRejectedApplicationListingWrapper />}
            />
            <Route
              path="VERIFY"
              element={<GumastaVerifiedApplicationListingWrapper />}
            /> 
            <Route
              path="CANCELLED"
              element={<GumastaCancelledApplicationListingWrapper />}
            />
          </Route>
          <Route
            path="/gumasta/:gumastaApplicationId"
            element={<ViewGumastaCardApplicationWrapper />}
          />
          <Route path="/dsc" element={<DSCListingWrapper />}>
            <Route
              path="PENDING"
              element={<DSCPendingApplicationListingWrapper />}
            />
            <Route
              path="IN_PROGRESS"
              element={<DSCInProgressApplicationWrapper />}
            />
            <Route path="REJECT" element={<DSCRejectApplicationWrapper />} />
            <Route path="VERIFY" element={<DSCVerifyApplicationWrapper />} />
            <Route
              path="CANCELLED"
              element={<DSCCancelledApplicationWrapper />}
            />
          </Route>
          <Route
            path="/dsc/:dscApplicationId"
            element={<ViewDSCApplicationWrapper />}
          />
          <Route path="/msme" element={<MSMEListingWrapper />}>
            <Route path="PENDING" element={<MSMEPendingApplicationWrapper />} />
            <Route
              path="IN_PROGRESS"
              element={<MSMEInProgressApplicationWrapper />}
            />
            <Route path="REJECT" element={<MSMERejectApplicationWrapper />} />
            <Route path="VERIFY" element={<MSMEVerifyApplicationWrapper />} />
            <Route
              path="CANCELLED"
              element={<MSMECancelledApplicationListingWrapper />}
            />
          </Route>
          <Route
            path="/msme/:msmeApplicationId"
            element={<ViewMsmeCardApplicationWrapper />}
          />
          <Route path="/digital-pan" element={<DigitalPanListingWrapper />}/>

          <Route path="/loan-enquiry" element={<LoanEnquiryListingWrapper />} />
          <Route
            path="/contact-us-enquiry"
            element={<ContactUsEnquiryListingWrapper />}
          />
          <Route path="/gallery" element={<GalleryListingWrapper />} />
          <Route path="/gallery/add" element={<AddGalleryWrapper />} />
          <Route path="/dashboard" element={<DashboardListingWrapper />} />
          <Route
            path="/reward-point-value"
            element={<AddRewardPointValueWrapper />}
          />
          <Route
            path="/subscription"
            element={<SubscriptionListingWrapper />}
          />
          <Route
            path="/subscription/:id/edit"
            element={<EditSubscriptionWrapper />}
          />
          <Route
            path="/business-enquiry"
            element={<BusinessEnquiryListingWrapper />}
          />
          <Route
            path="/banner"
            element={
              <AuthHOC
                moduleName="BANNERS"
                type="MODULE"
                alt={<NotAuthorizedPage />}
              >
                {" "}
                <BannerUpdateListingWrapper />{" "}
              </AuthHOC>
            }
          />
          <Route
            path="/banner/add"
            element={
              <AuthHOC
                moduleName="BANNERS"
                type="ACTION"
                action={AccessAction.ADD}
              >
                <AddBannerWrapper />{" "}
              </AuthHOC>
            }
          />
          <Route
            path="/banner/:id/edit"
            element={
              <AuthHOC
                moduleName="BANNERS"
                type="ACTION"
                action={AccessAction.ADD}
              >
                <EditBannerWrapper />
              </AuthHOC>
            }
          />
          <Route path="/menu-links" element={<MenuLinksListingWrapper />} />
          <Route path="/menu-links/add" element={<AddMenuLinksWrapper />} />
          <Route
            path="/menu-links/:id/edit"
            element={<EditMenuLinkWrapper />}
          />
          <Route path="/rejection-list" element={<RejectionListingWrapper />} />
          <Route
            path="/rejection-list/add"
            element={<AddRejectionListWrapper />}
          />
          <Route
            path="/rejection-list/:rejectionId/edit"
            element={<EditRejectionListWrapper />}
          />
          <Route path="/ao-code-list" element={<AOCodeListingWrapper />} />
          <Route path="/ao-code-list/add" element={<AddBPLCodeWrapper />} />
          <Route
            path="/ao-code-list/:id/edit"
            element={<EditAoCodeWrapper />}
          />
          <Route path="/services" element={<ServicesWrapper />}>
            <Route path="PAN" element={<TabPANServiceWrapper />}>
              <Route
                path="categories"
                element={<PANServiceCategoriesListingWrapper />}
              />
              <Route path="commission" element={<PanCommissionWrapper />}>
                <Route
                  path="without-categories"
                  element={<AddPanCommissionValueWrapper />}
                />
                <Route
                  path="with-pco-categorie"
                  element={<PCOCategoriesWrapper/>}
                />
                    <Route
                  path="with-dsa-categorie"
                  element={<DSACategoriesWrapper/>}
                />
              </Route>
              <Route
                path="reward"
                element={<EditPanServiceRewardListingWrapper />}
              />
            </Route>
            <Route path="gumasta" element={<TabGumastaServiceWrapper />}>
              <Route
                path="commission"
                element={<AddGumastaCommissionValueWrapper />}
              />
              <Route
                path="reward"
                element={<EditGumastaServiceRewardListingWrapper />}
              />
            </Route>
            <Route path="MSME" element={<TabMSMEServiceWrapper />}>
              <Route
                path="commission"
                element={<AddMsmeCommissionValueWrapper />}
              />
              <Route
                path="reward"
                element={<EditMSMEServiceRewardListingWrapper />}
              />
            </Route>

            <Route path="DSC" element={<TabDSCServiceWrapper />}>
              <Route
                path="commission"
                element={<AddDscCommissionValueWrapper />}
              />
              <Route
                path="reward"
                element={<EditDSCServiceRewardListingWrapper />}
              />
            </Route>

            <Route path="ITR" element={<TabITRServiceWrapper />}>
              <Route
                path="categories"
                element={<ITRServiceCategoriesWrapperListing />}
              />
              <Route
                path="categories/add"
                element={<AddITRServiceCategoriesWrapper />}
              />
              <Route
                path="commission"
                element={<AddItrCommissionValueWrapper />}
              />
              <Route path="reward" element={<EditITRServiceListingWrapper />} />
            </Route>

            <Route path="digital-pan" element={"Digital Pan"} />
          </Route>
          <Route
            path="terms-condition"
            element={<TermsAndConditionsListingWrapper />}
          />
          <Route path="privacy-policy" element={<PrivacyAndPolicyWrapper />} />
          <Route path="refund-policy" element={<RefundPolicyWrapper />} />
          <Route path="download-form" element={<DownLoadsFormWrapper />} />
          <Route
            path="new-registration-reward"
            element={<AddNewRegistrationValueWrapper />}
          />
          <Route path="static-page" element={<StaticPagesWrapper />} />
          <Route path="static-page/add" element={<AddStaticPagesWrapper />} />
          <Route
            path="static-page/:staticPageUrl/edit"
            element={<EditStaticPageWrapper />}
          />
          <Route
            path="download-form/:id/edit"
            element={<EditDownLoadFormWrapper />}
          />
          <Route
            path="download-form/add"
            element={<AddDownLoadFormWrapper />}
          />
          <Route path="/videos" element={<VideoListWrapper />}>
            <Route path="app-videos" element={<TabAppVideoListWrapper />} />
            <Route path="app-videos/add" element={<AddAppVideoWrapper />} />
            <Route
              path="app-videos/:id/edit"
              element={<EditAppVideoWrapper />}
            />
            <Route
              path="tutorial-videos"
              element={<TabTutorialVideoListWrapper />}
            />
            <Route
              path="tutorial-videos/add"
              element={<AddTutorialVideoWrapper />}
            />
            <Route
              path="tutorial-videos/:id/edit"
              element={<EditTutorialVideoWrapper />}
            />
          </Route>
          <Route path="/base-price" element={<BasePriceListingWrapper />} />
          <Route path="/ledger" element={<LedgerListingWrapper />}>
            <Route
              path="commission"
              element={
                <AuthHOC
                  type="MODULE"
                  moduleName="COMMISSIONS"
                  alt={<NotAuthorizedPage />}
                >
                  <TabComissionListWrapper />
                </AuthHOC>
              }
            />
            <Route path="reward" element={<TabRewardListWrapper />} />
            <Route
              path="refund-balance"
              element={<TabRefundBalanceListWrapper />}
            />
          </Route>
          <Route path="/history" element={<HistoryListingWrapper />}>
            <Route
              path="pan"
              element={<TabHistoryApplicationPANListingWrapper />}
            />
            <Route
              path="itr"
              element={<TabHistoryApplicationITRListingWrapper />}
            />
            <Route
              path="msme"
              element={<TabHistoryApplicationMSMEListingWrapper />}
            />
            <Route
              path="dsc"
              element={<TabHistoryApplicationDSCListingWrapper />}
            />
            <Route
              path="gumasta"
              element={<TabHistoryApplicationGumastaListingWrapper />}
            />
          </Route>
          <Route path="/payment_failed" element={<FailedPaymentWrapper />}>
            <Route
              path="pan"
              element={
                <AuthHOC
                  moduleName="PAN_APPLICATIONS"
                  action={AccessAction.SHOW_FAILED_PAYMENTS}
                  alt={<NotAuthorizedPage />}
                >
                  <TabFailedPaymentPanApplicationListingWrapper />
                </AuthHOC>
              }
            />
            <Route
              path="itr"
              element={
                <AuthHOC
                  moduleName="ITR_APPLICATIONS"
                  action={AccessAction.SHOW_FAILED_PAYMENTS}
                  alt={<NotAuthorizedPage />}
                >
                  <TabFailedPaymentITRApplicationListingWrapper />
                </AuthHOC>
              }
            />
            <Route
              path="dsc"
              element={
                <AuthHOC
                  moduleName="DSC_APPLICATIONS"
                  action={AccessAction.SHOW_FAILED_PAYMENTS}
                  alt={<NotAuthorizedPage />}
                >
                  <TabFailedPaymentDSCApplicationListingWrapper />
                </AuthHOC>
              }
            />
            <Route
              path="gumasta"
              element={
                <AuthHOC
                moduleName="GUMASTA_APPLICATIONS"
                action={AccessAction.SHOW_FAILED_PAYMENTS}
                alt={<NotAuthorizedPage />}
              >
              <TabFailedPaymentGumastaApplicationListingWrapper />
              </AuthHOC>
              }
            />
            <Route
              path="msme"
              element={
                <AuthHOC
                moduleName="MSME_APPLICATIONS"
                action={AccessAction.SHOW_FAILED_PAYMENTS}
                alt={<NotAuthorizedPage />}
              >
              <TabFailedPaymentMSMEApplicationListingWrapper />
              </AuthHOC>
            }
            />
          </Route>
          <Route path="/footer-links" element={<AddFooterLinksWrapper />} />
          <Route path="/admins" element={<AdminListingWrapper />} />
          <Route path="/faq" element={<FAQListingWrapper />} />
          <Route path="/faq/add" element={<AddFAQWrapper />} />
          <Route path="/faq/:faqId/edit" element={<EditFAQWrapper />} />
          <Route path="/admins/add" element={<AddAdminWrapper />} />
          <Route
            path="/business-opportunity"
            element={<ListBusinessOppurtunityWrapper />}
          />
          <Route
            path="/business-opportunity/:id/edit"
            element={<EditBusinessOpportunityWrapper />}
          /> 

          <Route path="/admins/:adminId/edit" element={<EditAdminWrapper />} />
          <Route path="/admins/:adminId/change-password" element={<ChangePasswordWrapper />} />
          <Route
            path="/refund-request"
            element={<RefundRequestListingWrapper />}
          />
          <Route path="/admin-report" element={<AdminReportListingWrapper />} />
          <Route
            path="/distributor-report"
            element={<DistributorReportListingWrapper />}
          />
          <Route
            path="/retailer-report"
            element={<RetailerReportListingWrapper />}
          />
          <Route path="/roles" element={<RolesListingWrapper />} />
          <Route path="/roles/:roleId/edit" element={<EditRoleWrapper />} />
          <Route
            path="/contact-information"
            element={<AddContactInformationWrapper />}
          />
          <Route
            path="/change-password"
            element={<EditChangePasswordWrapper />}
          />{" "}
          <Route path="/roles/add" element={<AddRoleWrapper />} />
          <Route path="/payment-detail" element={<PaymentDetailWrapper />}>
            <Route
              path="pan"
              element={
                <AuthHOC
                  moduleName="PAN_APPLICATIONS"
                  action={AccessAction.SHOW_PAYMENTS_DETAILS}
                  alt={<NotAuthorizedPage />}
                >
                  <TabPaymentDetailPanApplicationListingWrapper/>
                </AuthHOC>
              }
            />
            <Route
              path="itr"
              element={
                <AuthHOC
                  moduleName="ITR_APPLICATIONS"
                  action={AccessAction.SHOW_PAYMENTS_DETAILS}
                  alt={<NotAuthorizedPage />}
                >
                 <TabPaymentDetailITRApplicationListingWrapper/> 
                </AuthHOC>
              }
            />
            <Route
              path="dsc"
              element={
                <AuthHOC
                  moduleName="DSC_APPLICATIONS"
                  action={AccessAction.SHOW_PAYMENTS_DETAILS}
                  alt={<NotAuthorizedPage />}
                >
                  <TabPaymentDSCApplicationListingWrapper />
                </AuthHOC>
              }
            />
            <Route
              path="gumasta"
              element={
                <AuthHOC
                moduleName="GUMASTA_APPLICATIONS"
                action={AccessAction.SHOW_PAYMENTS_DETAILS}
                alt={<NotAuthorizedPage />}
              >
              <TabPaymentDetailGumastaApplicationListingWrapper />
              </AuthHOC>
              }
            />
            <Route
              path="msme"
              element={
                <AuthHOC
                moduleName="MSME_APPLICATIONS"
                action={AccessAction.SHOW_PAYMENTS_DETAILS}
                alt={<NotAuthorizedPage />}
              >
              <TabPaymentDetailMSMEApplicationListingWrapper />
              </AuthHOC>
            }
            />
          </Route>
          <Route path="/gumastaConfiguration" element={<GumastaConfigurationWrapper/>}>

          </Route>
        </Routes> 
           
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;

