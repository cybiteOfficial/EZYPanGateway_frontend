import { AccessAction } from "./Enums/AccessAction";

export const filterApplicationStatus = [
  {
    label: "Pending",
    value: "PENDING",
    accessAction: AccessAction.SHOW_PENDNG_APP,
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
    accessAction: AccessAction.SHOW_IN_PROGRESS_APP,
  },
  {
    label: "Login Done",
    value: "VERIFY",
    accessAction: AccessAction.SHOW_VERIFIED_APP,
  },
  {
    label: "Reject",
    value: "REJECT",
    accessAction: AccessAction.SHOW_REJECTED_APP,
  },
  {
    label: "Generate",
    value: "GENERATE",
    accessAction: AccessAction.SHOW_GENERATED_APP,
  },
  {
    label: "Done",
    value: "DONE",
    accessAction: AccessAction.SHOW_DONE_APP,
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
    accessAction: AccessAction.SHOW_CANCELLED_APP,
  },
];
