export type UserAccessListResponse = {
    name: string;
    dob: string;
    date_and_time: string;
    mobile: string;
    email: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddUserAccess = {
    name: string;
    dob: string;
    date_and_time: string;
    mobile: string;
    email: string;
    password: string;
    confirm_password: string;
}

export type UpdateUserAccess = {
    body: {
        dob: string;
        name: string;
        date_and_time: string;
        mobile: string;
        email: string;
        password: string;
        sbjtCode: string;
        otpStatus: string;
        confirm_password: string;
    },
    id: string;
}