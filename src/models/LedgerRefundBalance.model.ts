export type RefundBalanceListResponse = {
    _id: string
    walletType: string
    walletAmount: number
    walletId: string
    userId: string
    applicationType: string
    applicationId: string
    transactionType: string
    debitedAmount: number
    creditedAmount: number
    createdByType: string
    createdById: string
    paymentStatus: string
    sjbtCode:string
    srn:string
    dateAndTime: string
    remark: string
    createdAt: string
    updatedAt: string
    __v: number
    user_id: string
    userName: string
    email: string
    mobileNumber: string
}

export type AddRefundBalance= {
    date_and_time: string;
    amount: string;
}

export type UpdateRefundBalance= {
    body: {
        date_and_time: string;
        amount: string;
    },
    id: string;
}