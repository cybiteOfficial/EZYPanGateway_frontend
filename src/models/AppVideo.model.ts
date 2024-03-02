export type AppVideoListResponse = {
    videoLink: string;
    showOnMobile: boolean;
    order: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;

}

export type AddAppVideo = {
    videos: string;
    showOnMobile: string;
    order: string;
}

export type UpdateAppVideo = {
    body: {
        videoLink: string;
        showOnMobile: boolean;
        order: string;
    },
    id: string | undefined;
}


export type UpdateShowOnMobileAppVideo = {
    body: {
        showOnMobile: boolean;
    }
    id: string;
}