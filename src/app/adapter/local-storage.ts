import { LocalAdapter } from "../entity/store/store.interfaces.js";

export class LocalStorageAdapter implements LocalAdapter {
  storageName: string;
  rawData: string;
  storage = window.localStorage;

  constructor(storageName: string) {
    this.storageName = storageName;
    this.rawData = "";
  }

  get() {
    const localStored = this.storage.getItem(this.storageName);

    if (!localStored || localStored === "undefined") {
      this.set(this.rawData);
      return this;
    }

    this.rawData = localStored;

    return this;
  }

  asString() {
    return this.#returnUndefinedIfEmpty(this.rawData);
  }

  asObject() {
    const isUndefined =
      this.#returnUndefinedIfEmpty(this.rawData) === undefined;
    return isUndefined ? undefined : JSON.parse(this.rawData);
  }

  set(value: string | Object | Array<unknown>) {
    const valueAsString =
      typeof value === "string" ? value : JSON.stringify(value);

    this.storage.setItem(this.storageName, valueAsString);
    this.rawData = valueAsString;

    return this;
  }

  delete() {
    this.storage.removeItem(this.storageName);
  }

  #returnUndefinedIfEmpty(value?: string) {
    return !!value?.length ? value : undefined;
  }
}
