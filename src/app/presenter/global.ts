import { useGroupsListSummary } from "../infra/gateway/useGroupsListSummary.js";
import { timeToUpdateDOMInMS } from "../GLOBAL/global.js";
import { hydrateMainMenu } from "../use-case/hydrate-main-menu.js";

const presentGlobalData = async () => {
  const leftMenu = document.getElementById("leftMenu");

  try {
    const groupsListGetter = new useGroupsListSummary();
    const groupsList = await groupsListGetter.getData();

    hydrateMainMenu({ menuDomReference: leftMenu, groupsList });
  } catch (error) {
    console.error("Error fetching groups list: ", error);
  }
};

presentGlobalData();

setTimeout(async () => {
  await presentGlobalData();
}, timeToUpdateDOMInMS);
