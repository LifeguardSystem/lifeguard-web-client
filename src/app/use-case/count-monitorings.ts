import { MonitorsStateCount } from "../infra/gateway/useGroupsListSummary.js";

export const countMonitorings = (
  monitorsStateCountList: MonitorsStateCount[]
) => {
  const total = monitorsStateCountList.reduce((acc, monitorsStateCount) => {
    const { warning, problem, normal } = monitorsStateCount;
    return acc + warning + problem + normal;
  }, 0);

  const withProblems = monitorsStateCountList.reduce(
    (acc, monitorsStateCount) => {
      const { problem } = monitorsStateCount;

      return acc + problem;
    },
    0
  );

  const withWarnings = monitorsStateCountList.reduce(
    (acc, monitorsStateCount) => {
      const { warning } = monitorsStateCount;

      return acc + warning;
    },
    0
  );

  const projectsWithProblemsAndWarnings = monitorsStateCountList.reduce(
    (acc, monitorsStateCount) => {
      const { problem, warning } = monitorsStateCount;

      const hasProblems = problem >= 1;
      const hasWarnings = warning >= 1;

      if (hasWarnings || hasProblems) return acc + 1;

      return acc;
    },
    0
  );

  return { withProblems, withWarnings, projectsWithProblemsAndWarnings, total };
};
