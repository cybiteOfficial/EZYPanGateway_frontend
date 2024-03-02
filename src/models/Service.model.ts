export type ServiceListResponse = {
    banner_image: string;
    show_on_mobile: string;
    show_on_phone: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddService = {
    banner_image: string;
    show_on_mobile: string;
    show_on_phone: string;
}

export type UpdateService = {
    body: {
        banner_image: string;
        show_on_mobile: string;
        show_on_phone: string;
    },
    id: string;
}