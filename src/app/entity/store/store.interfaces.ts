export interface LocalAdapter {
  set(dataToSave: Object | Array<unknown>): void;
  get(): this;
  asObject(): Object | Array<unknown>;
  delete(): void;
}
export interface ExternalAdapter {
  get(param?: { [key: string]: string }): Promise<this>;
  asObject(): Object | Array<unknown>;
}
