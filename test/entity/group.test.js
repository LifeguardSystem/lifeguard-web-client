import { Group } from "../../_site/app/entity/group/group.js";

describe("Group entity Testing", () => {
  it("should set a warning monitor and then get it", () => {
    const monitorExample = {
      id: "monitor",
      status: "warning",
      name: "Monitor",
      description: "I am a simple monitor mock",
    };

    const groupHandler = new Group("test group");
    groupHandler.setMonitor(monitorExample);

    expect(groupHandler.getMonitorsByStatus("warning")).toStrictEqual([
      monitorExample,
    ]);
  });
});
