import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { sideNavLayoutSlice } from "./slices";
import AdminSlice from "./slices/AdminSlice";
import agentsSlice from "./slices/agentsSlice";
import AppVideoSlice from "./slices/AppVideoSlice";
import BannerUpdateSlice from "./slices/BannerUpdateSlice";
import BasePriceSlice from "./slices/BasePriceSlice";
import PANCategorySlice from "./slices/PANCategorySlice";
import BusinessEnquirySlice from "./slices/BusinessEnquirySlice";
import CommissionSlice from "./slices/CommissionSlice";
import DashboardSlice from "./slices/DashboardSlice";
import DSCSlice from "./slices/DSCSlice";
import GumastaSlice from "./slices/GumastaSlice";
import ITRSlice from "./slices/ITRSlice";
import ledgerSlice from "./slices/ledgerSlice";
import loanEnquirySlice from "./slices/loanEnquirySlice";
import MenuLinksSlice from "./slices/MenuLinksSlice";
import MSMESlice from "./slices/MSMESlice";
import PANSlice from "./slices/PANSlice";
import RefundBalanceSlice from "./slices/RefundBalanceSlice";
import RefundRequestSlice from "./slices/RefundRequestSlice";
import retailerSlice from "./slices/retailerSlice";
import RewardSlice from "./slices/RewardSlice";
import RoleSlice from "./slices/RoleSlice";
import SubscriptionSlice from "./slices/SubscriptionSlice";
import TutorialVideoSlice from "./slices/TutorialVideoSlice";
import userAccessSlice from "./slices/userAccessSlice";
import VerticalNavBarSlice from "./slices/VerticalNavBarSlice";
import ITRCategoriesSlice from "./slices/ITRCategoriesSlice";
import ITRCommissionSlice from "./slices/ITRCommissionSlice";
import GallerySlice from "./slices/GallerySlice";
import PopUpBannerSlice from "./slices/PopUpBannerSlice";
import PANCommissionSlice from "./slices/PANCommissionSlice";
import GumastaCommissionSlice from "./slices/GumastaCommissionSlice";
import MSMECommissionSlice from "./slices/MSMECommissionSlice";
import DSCCommissionSlice from "./slices/DSCCommissionSlice";
import FAQSlice from "./slices/FAQSlice";
import PageLoaderSlice from "./slices/PageLoaderSlice";
import GuestSlice from "./slices/GuestSlice";
import ContactInformationSlice from "./slices/ContactInformationSlice";
import FooterLinksSlice from "./slices/FooterLinksSlice";
import GalleryCategorySlice from "./slices/GalleryCategorySlice";
import RejectionListSlice from "./slices/RejectionListSlice";
import AOCodeSlice from "./slices/AOCodeSlice";
import RewardPointValueSlice from "./slices/RewardPointValueSlice";
import apiSlice from "src/services/ApiSlice";
// import { authMiddleware } from "src/middlewares/authMiddleware";
import TabDistributorPanApplicationSlice from "./slices/TabDistributorPanApplicationSlice";
import TabDistributorITRApplicationSlice from "./slices/TabDistributorITRApplicationSlice";
import TabDistributorGumastaApplicationSlice from "./slices/TabDistributorGumastaApplicationSlice";
import TabDistributorDSCApplicationSlice from "./slices/TabDistributorDSCApplicationSlice";
import TabDistributorMSMEApplicationSlice from "./slices/TabDistributorMSMEApplicationSlice";
import TabGuestPANApplicationSlice from "./slices/TabGuestPANApplicationSlice";
import TabGuestITRApplicationSlice from "./slices/TabGuestITRApplicationSlice";
import TabGuestGumastaApplicationSlice from "./slices/TabGuestGumastaApplicationSlice";
import TabGuestDSCApplicationSlice from "./slices/TabGuestDSCApplicationSlice";
import TabGuestMSMEApplicationSlice from "./slices/TabGuestMSMEApplicationSlice";
import AuthSlice from "./slices/AuthSlice";
import TabDistributorRetailerSlice from "./slices/TabDistributorRetailerSlice";
import TabHistoryPanApplicationSlice from "./slices/TabHistoryPanApplicationSlice";
import TabHistoryITRApplicationSlice from "./slices/TabHistoryITRApplicationSlice";
import TabHistoryGumastaApplicationSlice from "./slices/TabHistoryGumastaApplicationSlice";
import TabHistoryDSCApplicationSlice from "./slices/TabHistoryDSCApplicationSlice";
import TabHistoryMSMEApplicationSlice from "./slices/TabHistoryMSMEApplicationSlice";
import TabRetailerPanApplicationSlice from "./slices/TabRetailerPanApplicationSlice";
import TabRetailerMSMEApplicationSlice from "./slices/TabRetailerMSMEApplicationSlice";
import TabRetailerITRApplicationSlice from "./slices/TabRetailerITRApplicationSlice";
import TabRetailerGumastaApplicationSlice from "./slices/TabRetailerGumastaApplicationSlice";
import TabRetailerDSCApplicationSlice from "./slices/TabRetailerDSCApplicationSlice";
import TermsAndConditionSlice from "./slices/TermsAndConditionSlice";
import ContactUsEnquirySlice from "./slices/ContactUsEnquirySlice";
import TabDistributorLogsSlice from "./slices/TabDistributorLogsSlice";
import TabRetailerLogSlice from "./slices/TabRetailerLogSlice";
import TabGuestLogsSlice from "./slices/TabGuestLogsSlice";
import TabDistributorRefundBalanceSlice from "./slices/TabDistributorRefundBalanceSlice";
import TabRetailerRefundBalanceSlice from "./slices/TabRetailerRefundBalanceSlice";
import AccessModuleSlice from "./slices/AccessModuleSlice";
import { authMiddleware } from "src/middlewares/authMiddleware";
import TabDistributorRewardSlice from "./slices/TabDistributorRewardSlice";
import TabRetailerRewardSlice from "./slices/TabRetailerRewardSlice";
import AdminReportSlice from "./slices/Report/AdminReportSlice";
import DistributorReportSlice from "./slices/Report/DistributorReportSlice";
import RetailerReportSlice from "./slices/Report/RetailerReportSlice";
import DownLoadFormSlice from "./slices/DownLoadFormSlice";
import BusinessOpportunitySlice from "./slices/BusinessOpportunitySlice";
import OtherServicesSlice from "./slices/OtherServicesSlice";
import StaticPagesSlice from "./slices/StaticPagesSlice";
import TabDistributorSubscriptionPlanHistorySlice from "./slices/TabDistributorSubscriptionPlanHistorySlice";
import PANServiceRewardSlice from "./slices/PANServiceRewardSlice";
import ITRServiceRewardSlice from "./slices/ITRServiceRewardSlice";
import DSCServiceRewardSlice from "./slices/DSCServiceRewardSlice";
import MSMEServiceRewardSlice from "./slices/MSMEServiceRewardSlice";
import GumastaServiceRewardSlice from "./slices/GumastaServiceRewardSlice";
import NewRegistartionRewardSlice from "./slices/NewRegistartionRewardSlice";
import TabDistributorComissionSlice from "./slices/TabDistributorComissionSlice";
import TabRetailerComissionSlice from "./slices/TabRetailerComissionSlice";
import PANPendingApplicationSlice from "./slices/PANApplication/PANPendingApplicationSlice";
import PANRejectedApplicationSlice from "./slices/PANApplication/PANRejectedApplicationSlice";
import PANDoneApplicationSlice from "./slices/PANApplication/PANDoneApplicationSlice";
import PANCacelledApplicationSlice from "./slices/PANApplication/PANCacelledApplicationSlice";
import PANGenerateApplicationSlice from "./slices/PANApplication/PANGenerateApplicationSlice";
import PANVerifiedApplicationSlice from "./slices/PANApplication/PANVerifiedApplicationSlice";
import PANInProgressApplicationSlice from "./slices/PANApplication/PANInProgressApplicationSlice";
import ITRPendingApplicationSlice from "./slices/ITRApplication/ITRPendingApplicationSlice";
import ITRRejectedApplicationSlice from "./slices/ITRApplication/ITRRejectedApplicationSlice";
import ITRCancelledApplicationSlice from "./slices/ITRApplication/ITRCancelledApplicationSlice";
import ITRDoneApplicationSlice from "./slices/ITRApplication/ITRDoneApplicationSlice";
import ITRGenerateApplicationSlice from "./slices/ITRApplication/ITRGenerateApplicationSlice";
import ITRVerifiedApplicationSlice from "./slices/ITRApplication/ITRVerifiedApplicationSlice";
import ITRInProgressApplicationSlice from "./slices/ITRApplication/ITRInProgressApplicationSlice";
import GumastaPendingApplicationSlice from "./slices/GumastaApplication/GumastaPendingApplicationSlice";
import GumastaRejectedApplicationSlice from "./slices/GumastaApplication/GumastaRejectedApplicationSlice";
import GumastaCancelledApplicationSlice from "./slices/GumastaApplication/GumastaCancelledApplicationSlice";
import GumastaDoneApplicationSlice from "./slices/GumastaApplication/GumastaDoneApplicationSlice";
import GumastaGenerateApplicationSlice from "./slices/GumastaApplication/GumastaGenerateApplicationSlice";
import GumastaVerifiedApplicationSlice from "./slices/GumastaApplication/GumastaVerifiedApplicationSlice";
import GumastaInProgressApplicationSlice from "./slices/GumastaApplication/GumastaInProgressApplicationSlice";
import DSCPendingApplicationSlice from "./slices/DSCApplication/DSCPendingApplicationSlice";
import DSCInProgressApplicationSlice from "./slices/DSCApplication/DSCInProgressApplicationSlice";
import DSCRejectApplicationSlice from "./slices/DSCApplication/DSCRejectApplicationSlice";
import DSCVerifyApplicationSlice from "./slices/DSCApplication/DSCVerifyApplicationSlice";
import DSCGenerateApplicationSlice from "./slices/DSCApplication/DSCGenerateApplicationSlice";
import DSCDoneApplicationSlice from "./slices/DSCApplication/DSCDoneApplicationSlice";
import DSCCancelledApplicationSlice from "./slices/DSCApplication/DSCCancelledApplicationSlice";
import MSMEPendingApplicationSlice from "./slices/MSMEApplication/MSMEPendingApplicationSlice";
import MSMERejectedApplicationSlice from "./slices/MSMEApplication/MSMERejectedApplicationSlice";
import MSMECancelledApplicationSlice from "./slices/MSMEApplication/MSMECancelledApplicationSlice";
import MSMEDoneApplicationSlice from "./slices/MSMEApplication/MSMEDoneApplicationSlice";
import MSMEGenerateApplicationSlice from "./slices/MSMEApplication/MSMEGenerateApplicationSlice";
import MSMEVerifiedApplicationSlice from "./slices/MSMEApplication/MSMEVerifiedApplicationSlice";
import MSMEInProgressApplicationSlice from "./slices/MSMEApplication/MSMEInProgressApplicationSlice";
import TabFailedPaymentPanSlice from "./slices/TabFailedPaymentPanSlice";
import TabFailedPaymentDSCSlice from "./slices/TabFailedPaymentDSCSlice";
import TabFailedPaymentGumastaSlice from "./slices/TabFailedPaymentGumastaSlice";
import TabFailedPaymentITRSlice from "./slices/TabFailedPaymentITRSlice";
import TabFailedPaymentMSMESlice from "./slices/TabFailedPaymentMSMESlice"; 
import TabPaymentDetailDSCSlice from "./slices/TabPaymentDetailDSCSlice";
import TabPaymentDetailGumastaSlice from "./slices/TabPaymentDetailGumastaSlice";
import TabPaymentDetailITRSlice from "./slices/TabPaymentDetailITRSlice";
import TabPaymentDetailMSMESlice from "./slices/TabPaymentDetailMSMESlice";
import TabPaymentDetailPanSlice from "./slices/TabPaymentDetailPanSlice";
import DigitalPANSlice from "./slices/DigitalPANSlice";
import GumastaConfigState from "./slices/GumastaConfigState";
import GumastaConfigDistrict from "./slices/GumastaConfigDistrict";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    sideNavLayout: sideNavLayoutSlice,
    verticalNavBar: VerticalNavBarSlice,
    pageLoader: PageLoaderSlice,
    agents: agentsSlice,
    businessOpportunity: BusinessOpportunitySlice,
    tabDistributorPanApplication: TabDistributorPanApplicationSlice,
    tabDistributorITRApplication: TabDistributorITRApplicationSlice,
    tabDistributorGumastaApplication: TabDistributorGumastaApplicationSlice,
    tabDistributorDSCApplication: TabDistributorDSCApplicationSlice,
    tabDistributorMSMEApplication: TabDistributorMSMEApplicationSlice,
    tabGuestPANApplication: TabGuestPANApplicationSlice,
    tabGuestITRApplication: TabGuestITRApplicationSlice,
    tabGuestDSCApplication: TabGuestDSCApplicationSlice,
    tabGuestGumastaApplication: TabGuestGumastaApplicationSlice,
    tabGuestMSMEApplication: TabGuestMSMEApplicationSlice,
    tabDistributorRetailer: TabDistributorRetailerSlice,
    tabRetailerPanApplication: TabRetailerPanApplicationSlice,
    tabRetailerMSMEApplication: TabRetailerMSMEApplicationSlice,
    tabRetailerITRApplication: TabRetailerITRApplicationSlice,
    tabRetailerGumastaApplication: TabRetailerGumastaApplicationSlice,
    tabRetailerDSCApplication: TabRetailerDSCApplicationSlice,
    downloadForm: DownLoadFormSlice,
    tabDistributorRefundBalance: TabDistributorRefundBalanceSlice,
    tabDistributorCommission: TabDistributorComissionSlice,
    tabDistributorReward: TabDistributorRewardSlice,
    tabRetailerRefundBalance: TabRetailerRefundBalanceSlice,
    tabRetailerReward: TabRetailerRewardSlice,
    tabRetailerComission: TabRetailerComissionSlice,
    termsAndConditionApplication: TermsAndConditionSlice,
    tabDistributorLog: TabDistributorLogsSlice,
    tabGuestLog: TabGuestLogsSlice,
    retailer: retailerSlice,
    guest: GuestSlice,
    contactUsEnquiry: ContactUsEnquirySlice,
    userAccess: userAccessSlice,
    pan: PANSlice,
    itr: ITRSlice,
    gumasta: GumastaSlice,
    rejectionList: RejectionListSlice,
    dsc: DSCSlice,
    gallery: GallerySlice,
    reward: RewardSlice,
    refundBalance: RefundBalanceSlice,
    commission: CommissionSlice,
    appVideo: AppVideoSlice,
    tutorialVideo: TutorialVideoSlice,
    msme: MSMESlice,
    itrCategories: ITRCategoriesSlice,
    otherServices: OtherServicesSlice,
    itrCommission: ITRCommissionSlice,
    panCommission: PANCommissionSlice,
    newRegistrationReward: NewRegistartionRewardSlice,
    retailerLog: TabRetailerLogSlice,
    loanEnquiry: loanEnquirySlice,
    businessEnquiry: BusinessEnquirySlice,
    bannerUpdate: BannerUpdateSlice,
    menuLinks: MenuLinksSlice,
    roles: RoleSlice,
    admin: AdminSlice,
    refundRequest: RefundRequestSlice,
    ledger: ledgerSlice,
    accessModule: AccessModuleSlice,
    adminReport: AdminReportSlice,
    distributorReport: DistributorReportSlice,
    tabDistributorSubscriptionPlanHistory:
      TabDistributorSubscriptionPlanHistorySlice,
    retailerReport: RetailerReportSlice,
    dashboard: DashboardSlice,
    subscription: SubscriptionSlice,
    basePrice: BasePriceSlice,
    panCategory: PANCategorySlice,
    itrCategory: ITRCategoriesSlice,
    gumastaCommission: GumastaCommissionSlice,
    msmeCommission: MSMECommissionSlice,
    dscCommission: DSCCommissionSlice,
    popUpBanner: PopUpBannerSlice,
    faq: FAQSlice,
    staticPages: StaticPagesSlice,
    rewardPointValue: RewardPointValueSlice,
    galleryCategory: GalleryCategorySlice,
    footerLink: FooterLinksSlice,
    contactUs: ContactInformationSlice,
    aoCodeList: AOCodeSlice,
    panServiceReward: PANServiceRewardSlice,
    itrServiceReward: ITRServiceRewardSlice,
    dscServiceReward: DSCServiceRewardSlice,
    MSMEServiceReward: MSMEServiceRewardSlice,
    GumastaServiceReward: GumastaServiceRewardSlice,
    PANPendingApplication: PANPendingApplicationSlice,
    PANRejectedApplication: PANRejectedApplicationSlice,
    PANCancelledApplication: PANCacelledApplicationSlice,
    PANDoneApplication: PANDoneApplicationSlice,
    PANGenerateApplication: PANGenerateApplicationSlice,
    PANVerifiedApplication: PANVerifiedApplicationSlice,
    PANInProgressApplication: PANInProgressApplicationSlice,

    ITRPendingApplication: ITRPendingApplicationSlice,
    ITRRejectedApplication: ITRRejectedApplicationSlice,
    ITRCancelledApplication: ITRCancelledApplicationSlice,
    ITRDoneApplication: ITRDoneApplicationSlice,
    ITRGenerateApplication: ITRGenerateApplicationSlice,
    ITRVerifiedApplication: ITRVerifiedApplicationSlice,
    ITRInProgressApplication: ITRInProgressApplicationSlice,

    GumastaPendingApplication: GumastaPendingApplicationSlice,
    GumastaRejectedApplication: GumastaRejectedApplicationSlice,
    GumastaCancelledApplication: GumastaCancelledApplicationSlice,
    GumastaDoneApplication: GumastaDoneApplicationSlice,
    GumastaGenerateApplication: GumastaGenerateApplicationSlice,
    GumastaVerifiedApplication: GumastaVerifiedApplicationSlice,
    GumastaInProgressApplication: GumastaInProgressApplicationSlice,

    MSMEPendingApplication: MSMEPendingApplicationSlice,
    MSMERejectedApplication: MSMERejectedApplicationSlice,
    MSMECancelledApplication: MSMECancelledApplicationSlice,
    MSMEDoneApplication: MSMEDoneApplicationSlice,
    MSMEGenerateApplication: MSMEGenerateApplicationSlice,
    MSMEVerifiedApplication: MSMEVerifiedApplicationSlice,
    MSMEInProgressApplication: MSMEInProgressApplicationSlice,

    DSCPendingApplication: DSCPendingApplicationSlice,
    DSCInProgressApplication: DSCInProgressApplicationSlice,
    DSCRejectApplication: DSCRejectApplicationSlice,
    DSCVerifyApplication: DSCVerifyApplicationSlice,
    DSCGenerateApplication: DSCGenerateApplicationSlice,
    DSCDoneApplication: DSCDoneApplicationSlice,
    DSCCancelledApplication: DSCCancelledApplicationSlice,

    DigitalPANSlice: DigitalPANSlice ,

    tabHistoryPanApplication: TabHistoryPanApplicationSlice,
    tabHistoryITRApplication: TabHistoryITRApplicationSlice,
    tabHistoryGumastaApplication: TabHistoryGumastaApplicationSlice,
    tabHistoryDSCApplication: TabHistoryDSCApplicationSlice,
    tabHistoryMSMEApplication: TabHistoryMSMEApplicationSlice,

    TabFailedPaymentPan:TabFailedPaymentPanSlice,
    TabFailedPaymentDSC:TabFailedPaymentDSCSlice,
    TabFailedPaymentGumasta:TabFailedPaymentGumastaSlice,
    TabFailedPaymentITR:TabFailedPaymentITRSlice,
    TabFailedPaymentMSME:TabFailedPaymentMSMESlice,

    TabPaymentDetailDSCSlice:TabPaymentDetailDSCSlice ,
    TabPaymentDetailGumastaSlice:TabPaymentDetailGumastaSlice,
    TabPaymentDetailITRSlice:TabPaymentDetailITRSlice,
    TabPaymentDetailMSMESlice:TabPaymentDetailMSMESlice,
    TabPaymentDetailPanSlice:TabPaymentDetailPanSlice,
    gumastaConfigDistrict :GumastaConfigDistrict,
    gumastaConfigState:GumastaConfigState,
   
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authMiddleware, apiSlice.middleware]),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
