export type PopUpBannerListResponse = {
    _id: string
    image: string
    createdAt: string
    updatedAt: string
    showOnMobile: boolean
    showOnWeb: boolean
    isDeleted: boolean
    isActive: boolean
    __v: number

}

export type AddPopUpBanner = {
    image: string;
}

export type UpdatePopUpBanner = {
    body: {
        image: string;
    },
    id: string;
}