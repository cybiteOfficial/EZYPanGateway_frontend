export type TermsAndConditionListResponse = {
    description: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    isDeleted: boolean,
    isActive: boolean,
    __v: 0
}
export type UpdateTermsAndCondition = {
    body: {
        description: any;
    },
    id: string;
}