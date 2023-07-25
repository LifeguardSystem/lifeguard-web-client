export class fetchAdapter {
  constructor(endpoint, credentials) {
    this.endpoint = endpoint;
    this.credentials = credentials;
    this.rawData = "{}";
  }

  async get(params) {
    await this.fetch("post", { ...this.credentials, ...params });
    return this;
  }

  asString() {
    return JSON.stringify(this.asObject());
  }

  async asObject() {
    return await this.rawData.response.new;
  }

  async set(value) {
    await this.fetch("post", { ...this.credentials, ...value });
    return this;
  }

  async fetch(method, bodyData) {
    const body = this.valueAsString(bodyData);
    try {
      const response = await fetch(`/.netlify/functions/${this.endpoint}`, {
        method,
        headers: this.setHeaders(),
        body,
      });

      const serverReturnedError = !response.ok;
      if (serverReturnedError) {
        return response.text().then((text) => {
          throw JSON.parse(text);
        });
      }

      this.rawData = await response.json();
    } catch (error) {
      this.rawData = "{}";
      console.error(`Não conseguimos efetuar a requisição no endpoint, .../${this.endpoint}`);
      throw new Error(error);
    }

    return this;
  }

  setHeaders() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    return headers;
  }

  valueAsString(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }
}
