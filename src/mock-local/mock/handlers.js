import { bees } from "./groupIndividual/bees.js";
import { jbp } from "./groupIndividual/jbp.js";
import { groups } from "./groups/groups.js";

export const mockHandlers = {
  "/groups": groups,
  "/groups/?name=JBP": jbp,
  "/groups/?name=bees": bees,
};
