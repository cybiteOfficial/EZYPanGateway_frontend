
export type RoleListResponse = {
    roleName: string;
    modules: {
      moduleGroup: string;
      actions: string[];
      fields: {
        fieldName: string;
        displayName: string;
      }[];
    }[];    
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddRole = {
    role: string;
}

export type UpdateRole = {
    body: {
        modules: {
            moduleGroup: string;
            actions: string[];
            fields: {
              fieldName: string;
              displayName: string;
            }[];
          }[];    
        },
    id: string;
}