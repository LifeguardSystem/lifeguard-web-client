export class fetchAdapter {
  #rawData;

  constructor(domain, path) {
    this.domain = domain;
    this.path = path;
    this.#rawData = "{}";
  }

  /**
   *
   * @param {{[key: string]: string}} [params]
   */
  async get(params) {
    await this.#fetch({ method: "get", urlParams: params });
    return this;
  }

  /**
   * @param {{[key: string]: string}} value
   * @param {{[key: string]: string}} [params]
   */
  async set(value, params) {
    await this.#fetch({ method: "post", bodyData: value, urlParams: params });
    return this;
  }

  async asObject() {
    return await this.#rawData.response.new;
  }

  asString() {
    return JSON.stringify(this.asObject());
  }

  /**
   * @param {{method: "get" | "post", bodyData: {[key: string]: string}, urlParams: {[key: string]: string}}} params
   */
  async #fetch({ method, bodyData, urlParams }) {
    const url = new URL(`${this.domain}${this.path}`);
    const body = this.#valueAsString(bodyData);

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
      this.#rawData = "{}";
      console.error(`The error occured on fetching the path, .../${this.path}`);
      throw new Error(error);
    }

    return this;
  }

  #setHeaders() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    return headers;
  }

  #valueAsString(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  #transformObjectIntoQueryParamsString(object) {
    return new URLSearchParams(object).toString();
  }
}
