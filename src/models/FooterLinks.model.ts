export type FooterLinksListResponse = {
    categoryName: string;
    order: string;
    links: [
        {
            name : string;
            link : string;
        }
    ]
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    isActive: boolean
    _id: string;
    __v: number;

  }
  
  export interface Link {
    name: string
    url: string
}

export type AddFooterLinks = {
    category_name: string;
    order: string;
    links: [
        {
            name : string;
            link : string;
        }
    ]
}

export type UpdateFooterLinks = {
    body: {
        category_name: string;
        order: string;
        links: [
            {
                name : string;
                link : string;
            }
        ]
    },
    id: string;
}