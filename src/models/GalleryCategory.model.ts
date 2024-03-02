export type GalleryCategoryListResponse = {
    _id: string
    title: string
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    isActive: boolean
    __v: number
}

export type AddGalleryCategory = {
    title: string
}