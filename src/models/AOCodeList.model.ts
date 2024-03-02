export type AOCodeListResponse = {
    _id: string
    city: string
    areaCode: string
    aoType: string
    rangeCode: number
    aoNo: number
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    isActive: boolean
    __v: number
}

export type AddAOCodeList = {
    city: string
    areaCode: string
    aoType: string
    rangeCode: number
    aoNo: number
}

export type UpdateAOCodeList = {
    body: {
        city: string
        areaCode: string
        aoType: string
        rangeCode: number
        aoNo: number
    },
    id: string;
}