import { Store } from "../entity/store/store";
import { Status } from "../entity/group/group.interfaces";
import { FetchAdapter } from "../adapter/fetch";
import { LocalStorageAdapter } from "../adapter/local-storage";

type MonitorsStateCount = { [key in Status]: number };

type GroupsListResponse = {
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
      fetch: new FetchAdapter(process.env.DOMAIN, "/groups"),
      local: new LocalStorageAdapter("groupsList"),
      cacheManager: new LocalStorageAdapter("cacheManager"),
    });
  }

  async getData(onlyFromLocal = false) {
    return super.getData(onlyFromLocal) as Promise<GroupsListResponse>;
  }
}
