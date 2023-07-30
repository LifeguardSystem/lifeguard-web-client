import { timeToUpdateDOMInMS } from "../global/global.js";
import { useGroupSingle } from "../infra/gateway/useGroupSingle.js";
import { getDataFromSearchParam } from "../use-case/get-data-from-search-param.js";

const presentGroupData = async () => {
  const url = location.href;
  const { name: groupName } = getDataFromSearchParam(url).asObject;
  try {
    const groupSingleGetter = new useGroupSingle(groupName);
    const groupData = await groupSingleGetter.getData();
    console.log(groupData);
  } catch (error) {
    console.error("Error fetching group single: ", error);
  }
};

presentGroupData();

setTimeout(async () => {
  await presentGroupData();
}, timeToUpdateDOMInMS);
