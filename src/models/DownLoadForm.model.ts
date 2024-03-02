export type DownLoadFormListResponse = {
    form: string;
    fileTitle: string;
    fileUrl :string;
    description: string;    
    _id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isActive: boolean;
    __v: number;
}
export type UpdateDownLOadFormListResponse = {
    body: {
        description: string;
        fileTitle: string;
        fileUrl: string;
      
    },
    id: string;
}