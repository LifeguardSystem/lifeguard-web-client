import { useGroupsList } from "../infra/gateway/useGroupsList.js";
import { timeToUpdateDOMInMS } from "../global/global.js";
import { countMonitorings } from "../use-case/count-monitorings.js";
import { countProjectsWithProblemsOrWarnings } from "../use-case/count-projects-with-problems-or-warnings.js";
import { inserTextToDOMElement } from "../util/insertTextToDOMElement.js";
import { toPercentage } from "../util/to-percentage.js";

const presentHomeData = async () => {
  try {
    const groupsListGetter = new useGroupsList();
    const groupsList = await groupsListGetter.getData();

    const elementProjects = document.getElementById("summaryItemAlerts");
    const projectsWithProblemsAndWarnigns = toPercentage(
      groupsList.length,
      countProjectsWithProblemsOrWarnings(groupsList)
    ).formatted;
    inserTextToDOMElement({
      domElement: elementProjects,
      value: projectsWithProblemsAndWarnigns,
    });

    const elementMonitorProblems = document.getElementById(
      "summaryItemProblems"
    );
    const { withProblems, withWarnings, total } = countMonitorings(groupsList);
    const monitorsWithProblems = toPercentage(total, withProblems).formatted;
    inserTextToDOMElement({
      domElement: elementMonitorProblems,
      value: monitorsWithProblems,
    });

    const elementMonitorWarnings = document.getElementById(
      "summaryItemWarnings"
    );
    const monitorsWithWarnings = toPercentage(total, withWarnings).formatted;
    inserTextToDOMElement({
      domElement: elementMonitorWarnings,
      value: monitorsWithWarnings,
    });
  } catch (error) {
    console.error("Error fetching groups list: ", error);
  }
};

presentHomeData();

setTimeout(async () => {
  await presentHomeData();
}, timeToUpdateDOMInMS);
