export class Store {
  #local;
  #cacheManager;
  #online;

  constructor({ collection, endpoint, params, ttlInSeconds, fetch, local }) {
    this.collection = collection;
    this.params = params;
    this.endpoint = endpoint;
    this.ttlInSeconds = ttlInSeconds || 86400; //24 hours

    this.#local = new local(this.collection);
    this.#cacheManager = new local("cacheManager");
    this.#online = new fetch(this.endpoint);
  }

  async getData(onlyFromLocal = false) {
    const localData = this.#getLocalData();
    if (onlyFromLocal) {
      return localData;
    }

    return localData || this.#set();
  }

  setForced(newData) {
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
      [this.collection]: this.#getThisDateInSeconds(),
    });
  }

  #getTTL() {
    const lastUpdate =
      this.#cacheManager.get().asObject()?.[this.collection] ||
      this.#getThisDateInSeconds();
    const timeNow = this.#getThisDateInSeconds();
    const differenceInSeconds = Math.abs(lastUpdate - timeNow);

    return differenceInSeconds;
  }

  #getThisDateInSeconds() {
    return Math.round(new Date().getTime() / 1000);
  }
}
