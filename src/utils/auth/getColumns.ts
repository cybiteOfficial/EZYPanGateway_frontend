import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import AuthHOC from "src/userAccess/AuthHOC";

export const getColumns = (columns: columnTypes[], moduleName: string) => {
  return columns.filter((column) => {
    if (column.noAuthRequired) {
      return true;
    } else {
      return AuthHOC({
        type: "FIELD",
        moduleName,
        field: column.field,
        resultType: "BOOLEAN",
      });
    }
  });
};
