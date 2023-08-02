import { Monitor } from "../../entity/group/group.interfaces.js";
import { Store } from "../../entity/store/store.js";
import { FetchAdapter } from "../adapter/fetch.js";
import { LocalStorageAdapter } from "../adapter/local-storage.js";
import { domain } from "../../GLOBAL/global.js";

export type SingleGroupsResponse = {
  groupName: string;
  groupID: string;
  monitors: Monitor[];
};

export class useGroupSingle extends Store {
  constructor(groupID: string) {
    super({
      storeName: groupID,
      endpoint: "ENDPOINT",
      ttlInSeconds: 30,
      fetch: new FetchAdapter(domain, `/groups/?name=${groupID}`),
      local: new LocalStorageAdapter(groupID),
      cacheManager: new LocalStorageAdapter("cacheManager"),
    });
  }

  async getData(onlyFromLocal = false) {
    return super.getData(onlyFromLocal) as Promise<SingleGroupsResponse>;
  }
}
