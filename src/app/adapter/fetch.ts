import { ExternalAdapter } from "../entity/store/store.interfaces.js";

export class FetchAdapter implements ExternalAdapter {
  domain: string;
  path?: string;
  #rawData?: { response?: Object };

  constructor(domain: string, path?: string) {
    this.domain = domain;
    this.path = path;
    this.#rawData = {};
  }

  async get(params?: { [key: string]: string }) {
    await this.#fetch({ method: "get", urlParams: params });
    return this;
  }

  async set(
    value: { [key: string]: string },
    params: { [key: string]: string }
  ) {
    await this.#fetch({ method: "post", bodyData: value, urlParams: params });
    return this;
  }

  async asObject() {
    return this.#rawData?.response;
  }

  asString() {
    return JSON.stringify(this.asObject());
  }

  async #fetch(params: {
    method: "get" | "post";
    bodyData?: { [key: string]: string };
    urlParams?: { [key: string]: string };
  }) {
    const { method, bodyData, urlParams } = params;

    const url = new URL(`${this.domain}${this.path}`);
    const body = bodyData && this.#valueAsString(bodyData);

    if (urlParams) {
      const queryParams = this.#transformObjectIntoQueryParamsString(urlParams);
      url.search = queryParams;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: this.#setHeaders(),
        body,
      });

      const serverReturnedError = !response.ok;
      if (serverReturnedError) {
        return response.text().then((text) => {
          throw JSON.parse(text);
        });
      }

      this.#rawData = await response.json();
    } catch (error) {
      this.#rawData = {};
      console.error(
        `The error occured when fetching the path, .../${this.path}`
      );
      throw new Error(error);
    }

    return this;
  }

  #setHeaders() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    return headers;
  }

  #valueAsString(value: string | Object) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  #transformObjectIntoQueryParamsString(object: { [key: string]: string }) {
    return new URLSearchParams(object).toString();
  }
}
