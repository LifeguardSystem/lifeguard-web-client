export interface LocalAdapter {
  set(dataToSave: Object | Array<unknown>): void;
  get(): this;
  asObject(): Object;
  delete(): void;
}

export interface LocalConstructor {
  new (domain: string, path?: string): this;
}

export interface ExternalAdapter {
  get(param?: { [key: string]: string }): Promise<this>;
  asObject(): Object;
}

export interface ExternalConstructor {
  new (domain: string, path?: string): this;
}
