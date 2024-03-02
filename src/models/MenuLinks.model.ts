export type MenuLinksListResponse = {
    _id: string
    menuName: string
    order: number
    link: string
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    isActive: boolean
    __v: number
}

export type UpdateMenuLinks = {
    body: {
        order: number;
    },
    id: string;
}