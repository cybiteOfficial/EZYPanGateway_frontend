export type LedgerListResponse = {
    name: string;
    date_and_time: string;
    mobile: number;
    email: string;
    sjbt_code: string;
    retailer_number: number;
    pan_number: number;
    is_active: boolean;
    is_deleted: boolean;
    amount : string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddLedger = {
    name: string;
    date_and_time: string;
    mobile: number;
    email: string;
    sjbt_code: string;
    retailer_number: number;
    pan_number: number;
}

export type UpdateLedger = {
    body: {
        name: string;
        date_and_time: string;
        mobile: number;
        email: string;
        sjbt_code: string;
        retailer_number: number;
        pan_number: number;
    },
    id: string;
}