import { Store } from "../entity/store/store.js";
import { Status } from "../entity/group/group.interfaces.js";
import { FetchAdapter } from "../adapter/fetch.js";
import { LocalStorageAdapter } from "../adapter/local-storage.js";
import { domain } from "../global/global.js";

type MonitorsStateCount = { [key in Status]: number };

export type GroupsListResponse = {
  groupName: string;
  groupID: string;
  monitorsStateCount: MonitorsStateCount;
}[];

export class useGroupsList extends Store {
  constructor() {
    super({
      storeName: "groupsList",
      endpoint: "ENDPOINT",
      ttlInSeconds: 30,
      fetch: new FetchAdapter(domain, "/groups"),
      local: new LocalStorageAdapter("groupsList"),
      cacheManager: new LocalStorageAdapter("cacheManager"),
    });
  }

  async getData(onlyFromLocal = false) {
    return super.getData(onlyFromLocal) as Promise<GroupsListResponse>;
  }
}
