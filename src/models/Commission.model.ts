export type CommissionListResponse = {
    _id: string
    userId: string
    amount: number
    applicationType: string
    applicationId: string
    commissionFor: string
    commissionTransactionType: string
    logs: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    sjbtCode:string
    srn:string
    __v: number
    appliedByName: string
    email: string
    mobileNumber: string
}

export type AddCommission = {
    date_and_time: string;
    amount: string;
}

export type UpdateCommission = {
    body: {
        date_and_time: string;
        amount: string;
    },
    id: string;
}