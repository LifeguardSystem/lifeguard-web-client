import { GroupsListResponse } from "../gateway/useGroupsList.js";
import { inserTextToDOMElement } from "./insertTextToDOMElement.js";

export const hydrateMainMenu = async (params: {
  menuDomReference: HTMLElement;
  groupsList: GroupsListResponse;
}) => {
  const { menuDomReference, groupsList } = params;

  const listItemForAllData = {
    groupName: "Todos os projetos",
    groupID: "all",
    monitorsStateCount: {
      problem: groupsList.reduce((acc, group) => {
        return (acc += group.monitorsStateCount.problem);
      }, 0),
      warning: groupsList.reduce((acc, group) => {
        return (acc += group.monitorsStateCount.warning);
      }, 0),
      normal: groupsList.reduce((acc, group) => {
        return (acc += group.monitorsStateCount.normal);
      }, 0),
    },
  };

  const menuItemsData = [listItemForAllData, ...groupsList];

  menuDomReference.innerHTML = "";
  menuItemsData.map((menuItem) => {
    const menuItemComponent = document.createElement("custom-menu-item");

    const { groupName, groupID, monitorsStateCount } = menuItem;
    inserTextToDOMElement({ domElement: menuItemComponent, value: groupName });

    const isHomePageMenuItem = groupID === "all";
    if (!isHomePageMenuItem) {
      menuItemComponent.setAttribute("href", `/group/?name=${groupID}`);
    }

    const { warning, problem, normal } = monitorsStateCount;
    const allMonitors = warning + problem + normal;

    menuItemComponent.setAttribute("monitoring", `${allMonitors}`);
    menuItemComponent.setAttribute("warnings", `${warning}`);
    menuItemComponent.setAttribute("problems", `${problem}`);

    menuDomReference.append(menuItemComponent);
  });
};