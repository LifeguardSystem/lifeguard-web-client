import { useGroupsList } from "../gateway/useGroupsList.js";

export const hydrateMainMenu = async () => {
  try {
    const leftMenu = document.getElementById("leftMenu");
    const groupsListGetter = new useGroupsList();
    const groupsList = await groupsListGetter.getData();

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

    leftMenu.innerHTML = "";
    menuItemsData.map((menuItem) => {
      const menuItemComponent = document.createElement("custom-menu-item");

      const { groupName, groupID, monitorsStateCount } = menuItem;
      menuItemComponent.innerText = groupName;
      const isHomePageMenuItem = groupID === "all";
      if (!isHomePageMenuItem) {
        menuItemComponent.setAttribute("href", `/group/?name=${groupID}`);
      }

      const { warning, problem, normal } = monitorsStateCount;
      const allMonitors = warning + problem + normal;

      menuItemComponent.setAttribute("monitoring", `${allMonitors}`);
      menuItemComponent.setAttribute("warnings", `${warning}`);
      menuItemComponent.setAttribute("problems", `${problem}`);

      leftMenu.append(menuItemComponent);
    });
  } catch (error) {
    console.error("Error fetching groups list: ", error);
  }
};
