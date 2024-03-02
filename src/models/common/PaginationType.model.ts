export type PaginationType = {
  limit: number;
  searchValue: string;
  params: string[];
  page: number;
  filterBy: {
    fieldName: string;
    value: any[];
  }[];
  dateFilter: {
    start_date?: string;
    end_date?: string; 
    month?: string | null;
    year?: string | null;
    dateFilterKey?: string;
  };
  orderBy: string;
  orderByValue: number;
  isPaginationRequired?: boolean;
};
