export class localStorageAdapter {
  constructor(collection) {
    this.storage = window.localStorage;
    this.collection = collection;
    this.rawData = "";
  }

  get() {
    const localStored = this.storage.getItem(this.collection);

    if (!localStored || localStored === "undefined") {
      this.set(this.rawData);
      return this;
    }

    this.rawData = localStored;

    return this;
  }

  asString() {
    return this.returnUndefinedIfEmpty(this.rawData);
  }

  asObject() {
    const isUndefined = this.returnUndefinedIfEmpty(this.rawData) === undefined;
    return isUndefined ? undefined : JSON.parse(this.rawData);
  }

  set(value) {
    const valueAsString = typeof value === "string" ? value : JSON.stringify(value);
    this.storage.setItem(this.collection, valueAsString);
    this.rawData = valueAsString;

    return this;
  }

  delete() {
    this.storage.removeItem(this.collection);
  }

  returnUndefinedIfEmpty(val) {
    return !!val?.length ? val : undefined;
  }

  setListener() {
    const localStoreSetter = this.storage.setItem;

    this.storage.setItem = function (key, value) {
      const event = new Event("localStorageUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStoreSetter.apply(this, arguments);
    };
  }
}
