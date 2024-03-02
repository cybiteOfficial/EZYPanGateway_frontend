export type TutorialVideoListResponse = {
    _id: string,
    videoHeading: string,
    videoLink: string,
    order: string,
    createdAt: string,
    updatedAt: string,
    showOnMobile: boolean,
    isDeleted: boolean,
    isActive: boolean,
    __v: 0

}

export type UpdateShowOnMobileTutorialVideo ={
    body :{
        showOnMobile : boolean;
    }
    id:string;
}
export type AddTutorialVideo = {
    videos: string;
    videoTitle : string;
    order: string;
    is_active: boolean;
}

export type UpdateTutorialVideo = {
    body: {
        videoHeading: string;
        videoLink : string;
        order: string;
        showOnMobile: boolean;
    },
    id: string;
}