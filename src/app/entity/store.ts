export interface Local {
  set(dataToSave: Object | Array<unknown>): void;
  get(): this;
  asObject(): Object;
  delete(): void;
}

interface LocalConstructor {
  new (domain: string, path?: string): this;
}

export interface External {
  get(param?: { [key: string]: string }): Promise<this>;
  asObject(): Object;
}

interface ExternalConstructor {
  new (domain: string, path?: string): this;
}

export class Store {
  #local: Local;
  #cacheManager: Local;
  #online: External;

  storeName: string;
  params?: { [key: string]: string };
  endpoint: string;
  ttlInSeconds: number;

  constructor(parameters: {
    storeName: string;
    endpoint: string;
    params?: { [key: string]: string };
    ttlInSeconds?: number;
    fetch: ExternalConstructor & External;
    local: LocalConstructor & Local;
  }) {
    this.storeName = parameters.storeName;
    this.params = parameters.params;
    this.endpoint = parameters.endpoint;
    this.ttlInSeconds = parameters.ttlInSeconds || 86400; //24 hours

    this.#local = new parameters.local(this.storeName);
    this.#cacheManager = new parameters.local("cacheManager");
    this.#online = new parameters.fetch(this.endpoint);
  }

  async getData(onlyFromLocal = false) {
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