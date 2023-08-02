import { getDataFromSearchParam } from "../../_site/app/util/get-data-from-search-param.js";

describe("Get Data From Search Params Util test", () => {
  const url = "https://url.com/?query=param&param=query";

  it("Should return the keys from the url query Params", () => {
    const queryParamHandler = getDataFromSearchParam(url);
    expect(queryParamHandler.onlyKeys).toStrictEqual(["query", "param"]);
  });

  it("Should return query params and its values as an object", () => {
    const queryParamHandler = getDataFromSearchParam(url);
    expect(queryParamHandler.asObject).toStrictEqual({
      query: "param",
      param: "query",
    });
  });
});
