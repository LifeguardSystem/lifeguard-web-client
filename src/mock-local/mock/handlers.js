import { bees } from "./groupIndividual/bees.js";
import { jbp } from "./groupIndividual/jbp.js";
import { groupsSummary } from "./groups/groupsSummary.js";

export const mockHandlers = {
  "/groups/summary": groupsSummary,
  "/groups/?name=JBP": jbp,
  "/groups/?name=bees": bees,
};
