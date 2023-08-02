import * as Gateway from "../infra/gateway/useGroupsListSummary.js";
import { timeToUpdateDOMInMS } from "../GLOBAL/global.js";
import { countMonitorings } from "../use-case/count-monitorings.js";
import { inserTextToDOMElement } from "../util/insert-text-to-DOM-element.js";
import { toPercentage } from "../util/to-percentage.js";
import { useGroupSingle } from "../infra/gateway/useGroupSingle.js";
import { Group } from "../entity/group/group.js";
import { createMonitorVisualization } from "../use-case/create-monitor-visualization.js";
import { AddOn } from "../use-case/create-add-ons.js";
import { Status } from "../entity/group/group.interfaces.js";
import { hydrateMonitorCard } from "../use-case/hydrate-monitor-card.js";

const presentDashBoard = (groupsList: Gateway.GroupsListResponse) => {
  const monitorsStateCountList = groupsList.map(
    (group) => group.monitorsStateCount
  );

  const { withProblems, withWarnings, total, projectsWithProblemsAndWarnings } =
    countMonitorings(monitorsStateCountList);

  const elementProjects = document.getElementById("summaryItemAlerts");
  const projectsWithProblemsAndWarnigns = toPercentage(
    groupsList.length,
    projectsWithProblemsAndWarnings
  ).formatted;
  inserTextToDOMElement({
    domElement: elementProjects,
    value: projectsWithProblemsAndWarnigns,
  });

  const elementMonitorProblems = document.getElementById("summaryItemProblems");
  const monitorsWithProblems = toPercentage(total, withProblems).formatted;
  inserTextToDOMElement({
    domElement: elementMonitorProblems,
    value: monitorsWithProblems,
  });

  const elementMonitorWarnings = document.getElementById("summaryItemWarnings");
  const monitorsWithWarnings = toPercentage(total, withWarnings).formatted;
  inserTextToDOMElement({
    domElement: elementMonitorWarnings,
    value: monitorsWithWarnings,
  });
};

const presentGroupsList = async (groupsIdList: string[]) => {
  try {
    const groupsGateways = groupsIdList.map((id) => {
      const groupSingleGetter = new useGroupSingle(id);
      return groupSingleGetter.getData();
    });

    const groups = await Promise.all(groupsGateways);

    const domElementByStatus = {
      problem: document.getElementById("cardProblems"),
      warning: document.getElementById("cardWarnings"),
      normal: document.getElementById("cardNormal"),
    };
    const domElementByStatusKeys = Object.keys(domElementByStatus) as Status[];

    const statusAndGroupInfo = groups.map((groupData) => {
      const { groupName, groupID, monitors } = groupData;

      const addOnContentCreator = new AddOn();
      const groupToPresent = new Group(groupName);
      monitors.forEach((monitor) => groupToPresent.setMonitor(monitor));

      return {
        groupName,
        groupID,
        status: {
          problem: groupToPresent
            .getMonitorsByStatus("problem")
            .map((monitor) =>
              createMonitorVisualization(monitor, addOnContentCreator)
            ),
          warning: groupToPresent
            .getMonitorsByStatus("warning")
            .map((monitor) =>
              createMonitorVisualization(monitor, addOnContentCreator)
            ),
          normal: groupToPresent
            .getMonitorsByStatus("normal")
            .map((monitor) =>
              createMonitorVisualization(monitor, addOnContentCreator)
            ),
        },
      };
    });

    domElementByStatusKeys.forEach((status) => {
      const isEmpty = !statusAndGroupInfo.find(
        (data) => data.status[status].length
      );

      const monitorsByGroupsList = statusAndGroupInfo
        .map((group) => ({
          name: group.groupName,
          id: group.groupID,
          monitorList: group.status[status],
        }))
        .filter((group) => group.monitorList.length);

      hydrateMonitorCard(
        domElementByStatus[status],
        isEmpty,
        monitorsByGroupsList
      );
    });
  } catch (error) {
    console.error("Error fetching individual group: ", error);
  }
};

const presentHomeData = async () => {
  try {
    const groupsListGetter = new Gateway.useGroupsListSummary();
    const groupsList = await groupsListGetter.getData();

    const groupsIDList = groupsList.map((group) => group.groupID);

    presentDashBoard(groupsList);
    await presentGroupsList(groupsIDList);
  } catch (error) {
    console.error("Error fetching groups list: ", error);
  }
};

presentHomeData();

setTimeout(async () => {
  await presentHomeData();
}, timeToUpdateDOMInMS);
