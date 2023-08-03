import { region } from "../GLOBAL/global.js";

export const toPercentage = (total: number, part: number) => {
  const raw = (part / total) * 100;

  const formatted = new Intl.NumberFormat(region, {
    maximumFractionDigits: 1,
  }).format(raw);

  return { raw, formatted };
};
