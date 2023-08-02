import { countMonitorings } from "../../_site/app/use-case/count-monitorings.js";

describe("Count Monitoring Use Case test", () => {
  const monitoringList = [
    { warning: 0, problem: 2, normal: 1 },
    { warning: 10, problem: 1, normal: 0 },
    { warning: 1, problem: 0, normal: 0 },
  ];

  it("Should return the total number of monitorings being passed to it", () => {
    const counter = countMonitorings(monitoringList);
    expect(counter.total).toStrictEqual(15);
  });

  it("Should return the total of monitorings with the status warning passed to it", () => {
    const counter = countMonitorings(monitoringList);
    expect(counter.withWarnings).toStrictEqual(11);
  });

  it("Should return the total of monitorings with the status problem passed to it", () => {
    const counter = countMonitorings(monitoringList);
    expect(counter.withProblems).toStrictEqual(3);
  });

  it("Should return the number of project with either problems or warnings", () => {
    const counter = countMonitorings(monitoringList);
    expect(counter.projectsWithProblemsAndWarnings).toStrictEqual(3);
  });
});
