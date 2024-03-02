export type RefundPolicyListResponse = {
    description: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    isDeleted: boolean,
    isActive: boolean,
    __v: 0
}
export type UpdateRefundPolicy = {
    body: {
        description: any;
    },
    id: string;
}