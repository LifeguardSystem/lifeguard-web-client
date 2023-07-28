import { useGroupsList } from "../gateway/useGroupsList.js";

const hidrateMenu = async () => {
  try {
    const groupsListGetter = new useGroupsList();
    const groupsList = await groupsListGetter.getData();
  } catch (error) {
    console.error("Error fetching groups list: ", error);
  }
};

hidrateMenu();