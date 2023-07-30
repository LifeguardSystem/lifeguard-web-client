import { GroupsListResponse } from "../infra/gateway/useGroupsList";

export const countMonitorings = (groupsList: GroupsListResponse) => {
  const total = groupsList.reduce((acc, group) => {
    const { warning, problem, normal } = group.monitorsStateCount;

    return acc + warning + problem + normal;
  }, 0);

  const withProblems = groupsList.reduce((acc, group) => {
    const { problem } = group.monitorsStateCount;

    return acc + problem;
  }, 0);

  const withWarnings = groupsList.reduce((acc, group) => {
    const { warning } = group.monitorsStateCount;

    return acc + warning;
  }, 0);

  return { withProblems, withWarnings, total };
};
