import { bees } from "./groupIndividual/bees.js";
import { jbp } from "./groupIndividual/jbp.js";
import { groupsSummary } from "./groups/groupsSummary.js";

export const mockHandlers = {
  "/lifeguard/groups/summary": groupsSummary,
  "/lifeguard/groups/JBP": jbp,
  "/lifeguard/groups/bees": bees,
};
