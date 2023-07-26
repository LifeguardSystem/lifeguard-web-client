import * as Interface from "./store.interfaces.js";

export class Store {
  #local: Interface.LocalAdapter;
  #cacheManager: Interface.LocalAdapter;
  #online: Interface.ExternalAdapter;

  storeName: string;
  params?: { [key: string]: string };
  endpoint: string;
  ttlInSeconds: number;

  constructor(parameters: {
    storeName: string;
    endpoint: string;
    params?: { [key: string]: string };
    ttlInSeconds?: number;
    fetch: Interface.ExternalAdapter;
    local: Interface.LocalAdapter;
    cacheManager: Interface.LocalAdapter;
  }) {
    this.storeName = parameters.storeName;
    this.params = parameters.params;
    this.endpoint = parameters.endpoint;
    this.ttlInSeconds = parameters.ttlInSeconds || 86400; //24 hours

    this.#local = parameters.local;
    this.#cacheManager = parameters.cacheManager;
    this.#online = parameters.fetch;
  }

  async getData(onlyFromLocal = false): Promise<unknown> {
    const localData = this.#getLocalData();
    if (onlyFromLocal) {
      return localData;
    }

    return localData || this.#set();
  }

  setForced(newData: Object | unknown[]) {
    this.#removeCache();
    this.#local.set(newData);
    this.#setCacheDate();

    return newData;
  }

  #getLocalData() {
    const isOnline = window.navigator.onLine;
    const ttl = this.#getTTL();

    if (ttl > this.ttlInSeconds && isOnline) {
      this.#removeCache();
    }

    return this.#local.get().asObject();
  }

  async #getDataOnline() {
    return (await this.#online.get(this.params)).asObject();
  }

  #removeCache() {
    return this.#local.delete();
  }

  async #set() {
    this.#removeCache();
    const newData = await this.#getDataOnline();
    this.#local.set(newData);
    this.#setCacheDate();

    return newData;
  }

  #setCacheDate() {
    const cacheData = this.#cacheManager.get().asObject();
    this.#cacheManager.set({
      ...cacheData,
      [this.storeName]: this.#getThisDateInSeconds(),
    });
  }

  #getTTL() {
    const lastUpdateList = this.#cacheManager.get().asObject() as {
      [key: string]: number;
    };
    const lastUpdate =
      lastUpdateList?.[this.storeName] || this.#getThisDateInSeconds();

    const timeNow = this.#getThisDateInSeconds();
    const differenceInSeconds = Math.abs(lastUpdate - timeNow);

    return differenceInSeconds;
  }

  #getThisDateInSeconds() {
    return Math.round(new Date().getTime() / 1000);
  }
}
