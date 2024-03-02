export type AdminListResponse = {
    _id: string;
    userName: string;
    email: string;
    mobile: number;
    adminRoleGroupName: string;
    maximumInprogressCount :number;
    printWaitTime: number;
    applicationStatusAccess:[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}

export type AddAdmin = {
    name: string;
    date_and_time: string;
    mobile: string;
    email: string;
}

export type UpdateAdmin = {
    body: {
        userName: string;
        adminRoleGroupName: string;
        mobile: string;
        email: string;
        printWaitTime : string;
        },
    id: string;
}  
export type PasswordUpdateAdmin = {
    body: {
        newPassword: string;
    confirmPassword: string;
        },
    id: string;
}