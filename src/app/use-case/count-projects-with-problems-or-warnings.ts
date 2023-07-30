import { GroupsListResponse } from "../gateway/useGroupsList";

export const countProjectsWithProblemsOrWarnings = (
  groupsList: GroupsListResponse
) =>
  groupsList.reduce((acc, group) => {
    const { monitorsStateCount } = group;

    const hasProblems = monitorsStateCount.problem >= 1;
    const hasWarnings = monitorsStateCount.warning >= 1;

    if (hasWarnings || hasProblems) return acc + 1;

    return acc;
  }, 0);
