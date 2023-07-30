export const mockHandlers = {
  "/groups": {
    status: 200,
    body: [
      {
        groupName: "Joint Business Plan",
        groupID: "JBP",
        monitorsStateCount: {
          problem: 0,
          warning: 2,
          normal: 2,
        },
      },
      {
        groupName: "Abelinhas",
        groupID: "bees",
        monitorsStateCount: {
          problem: 5,
          warning: 0,
          normal: 1,
        },
      },
    ],
  },
  "/groups/?name=JBP": {
    status: 200,
    body: {
      groupName: "Joint Business Plan",
      groupID: "JBP",
      monitors: [
        {
          id: "",
          status: "normal",
          description: "",
          actions: [],
        },
      ],
    },
  },
};
