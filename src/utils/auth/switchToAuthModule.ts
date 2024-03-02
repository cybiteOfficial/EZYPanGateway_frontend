import AuthHOC from "src/userAccess/AuthHOC";

export const switchToAuthModule = (
  preferenceList: { moduleName: string; path: string; action?: string }[]
) => {
  let path: string = preferenceList[0]?.path || "";
  for (let i = 0; i < preferenceList.length; i++) {
    if (preferenceList[i].action) {
      if (
        AuthHOC({
          type: "ACTION",
          moduleName: preferenceList[i].moduleName,
          action: preferenceList[i].action,
          resultType: "BOOLEAN",
        })
      ) {
        path = preferenceList[i].path;
        return path;
      }
    } else {
      if (
        AuthHOC({
          type: "MODULE",
          moduleName: preferenceList[i].moduleName,
          resultType: "BOOLEAN",
        })
      ) {
        path = preferenceList[i].path;
        return path;
      }
    }
  }
};
