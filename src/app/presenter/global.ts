import { useGroupsList } from "../gateway/useGroupsList.js";

const hidrateMenu = async () => {
  try {
    const leftMenu = document.getElementById("leftMenu");
    const groupsListGetter = new useGroupsList();
    const groupsList = await groupsListGetter.getData();

    const listItemForAllData = {
      groupName: "Todos os projetos",
      groupID: "all",
      monitorsStateCount: {
        problem: 0,
        warning: 0,
        normal: 0,
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

      const allMonitors =
        monitorsStateCount.warning +
        monitorsStateCount.problem +
        monitorsStateCount.normal;
      menuItemComponent.setAttribute("monitoring", `${allMonitors}`);
      menuItemComponent.setAttribute(
        "warnings",
        `${monitorsStateCount.warning}`
      );
      menuItemComponent.setAttribute(
        "problems",
        `${monitorsStateCount.problem}`
      );

      leftMenu.append(menuItemComponent);
    });
  } catch (error) {
    console.error("Error fetching groups list: ", error);
  }
};

hidrateMenu();
