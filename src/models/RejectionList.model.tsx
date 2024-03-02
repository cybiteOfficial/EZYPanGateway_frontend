export type RejectionListResponse = {
    rejectionMsg: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}
export type UpdateRejectionList = {
    body: {
        rejectionMsg: string;
    },
    id: string | undefined;
}

export type RejectionListbyIdResponse = {
    rejectionMsg: string,
}