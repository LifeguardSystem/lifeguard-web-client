import { toPercentage } from "../../_site/app/util/to-percentage.js";
import { region } from "../../_site/app/global/global.js";

describe("To percentage testing", () => {
  it("Should return an unformatted result of a percentage", () => {
    const percentage = toPercentage(100, 50).raw;
    expect(percentage).toStrictEqual(50);
  });

  it("Should return a formatted result of a percentage", () => {
    const percentage = toPercentage(100, 33.33).formatted;

    const expectedResult = new Intl.NumberFormat(region, {
      maximumFractionDigits: 1,
    }).format(33.33);

    expect(percentage).toStrictEqual(expectedResult);
  });
});
