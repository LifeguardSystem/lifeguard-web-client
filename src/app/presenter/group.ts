import { Status } from "../entity/group/group.interfaces.js";
import { Group } from "../entity/group/group.js";
import { timeToUpdateDOMInMS } from "../global/global.js";
import { useGroupSingle } from "../infra/gateway/useGroupSingle.js";
import { AddOn } from "../use-case/create-add-ons.js";
import { createMonitorVisualization } from "../use-case/create-monitor-visualization.js";
import { getDataFromSearchParam } from "../use-case/get-data-from-search-param.js";
import { hydrateMonitorCard } from "../use-case/hydrate-monitor-card.js";

const presentGroupData = async () => {
  const url = location.href;
  const { name: groupID } = getDataFromSearchParam(url).asObject;
  try {
    const groupSingleGetter = new useGroupSingle(groupID);
    const groupData = await groupSingleGetter.getData();

    const { groupName, monitors } = groupData;

    const groupToPresent = new Group(groupName);
    monitors.forEach((monitor) => groupToPresent.setMonitor(monitor));

    const executor = {
      problem: {
        domElement: document.getElementById("cardProblems"),
        monitors: groupToPresent.getMonitorsByStatus("problem"),
      },
      warning: {
        domElement: document.getElementById("cardWarnings"),
        monitors: groupToPresent.getMonitorsByStatus("warning"),
      },
      normal: {
        domElement: document.getElementById("cardNormal"),
        monitors: groupToPresent.getMonitorsByStatus("normal"),
      },
    };

    const executorKeys = Object.keys(executor) as Status[];
    executorKeys.forEach((execute) => {
      const isEmpty = !executor[execute].monitors.length;

      const addOnContentCreator = new AddOn();
      const monitorElementList = executor[execute].monitors.map((monitor) =>
        createMonitorVisualization(monitor, addOnContentCreator)
      );

      const monitorsByGroupsList = [
        {
          monitorList: monitorElementList,
        },
      ];

      hydrateMonitorCard(
        executor[execute].domElement,
        isEmpty,
        monitorsByGroupsList
      );
    });
  } catch (error) {
    console.error("Error fetching group single: ", error);
  }
};

presentGroupData();

setTimeout(async () => {
  await presentGroupData();
}, timeToUpdateDOMInMS);
