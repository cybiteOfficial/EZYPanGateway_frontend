import AuthHOC from "src/userAccess/AuthHOC";

export const getTabs = (tabs: any[], moduleName?: string) => {
  return tabs?.filter((tab) => {
    if (tab.type === "MODULE") {
      return AuthHOC({
        type: "MODULE",
        moduleName: moduleName || tab.moduleName,
        resultType: "BOOLEAN",
      });
    } else {
      if (tab.accessAction) {
        return AuthHOC({
          type: tab.type,
          moduleName: moduleName || tab.moduleName,
          resultType: "BOOLEAN",
          action: tab.accessAction,
        });
      } else {
        return true;
      }
    }
  });
};
