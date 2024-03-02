import moment from "moment";

export const formatDateAndTime = (
  dateAndTime: string,
  format?: string
): string => {
  return moment(dateAndTime).format(format || "DD-MMM-yyyy - hh:mm A");
};
