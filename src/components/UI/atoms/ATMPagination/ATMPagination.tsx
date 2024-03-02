import * as React from "react";
import Pagination from "@mui/material/Pagination";

interface ATMPaginationPropTypes {
  page: number;
  onPageChange: (newPage: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  rowCount: number;
  rowsPerPageOptions?: number[];
  rows: any[];
  hideRowsPerPage?: boolean;
}

const ATMPagination = ({
  rows,
  rowCount,
  page,
  onPageChange,
  rowsPerPage,
}: ATMPaginationPropTypes) => {

  return (
    <>
      {rows.length ? (
        <div className="flex justify-between items-center py-2">
          {/* Out of */}
          <div>
            <Pagination
              count={Math.ceil(rowCount / rowsPerPage)}
              page={page}
              onChange={(e, page) => onPageChange(page)}
              showFirstButton={true}
              showLastButton={true}
              color="primary"
              size="small"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ATMPagination;
