export type ChangePasswordListResponse = {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type ChangePassword = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

