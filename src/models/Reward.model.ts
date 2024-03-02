export type RewardListResponse = {
    date_and_time: string;
    points: string;
    userName : string;
    mobileNumber:string;
    applicationType : string;
    is_active: boolean;
    is_deleted: boolean;
    srn:string;
    createdAt: string;
    updatedAt: string;
    rewardTransactionType:string;
    sjbtCode?:string;
    logs:string ;
    _id: string;
    __v: number;

}

export type AddReward = {
    date_and_time: string;
    amount: string;
}

export type UpdateReward = {
    body: {
        date_and_time: string;
        amount: string;
    },
    id: string;
}