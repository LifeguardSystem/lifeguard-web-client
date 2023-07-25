class Flex extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("flex-template").content;
    this.attachShadow({ mode: "open" }).append(this.template.cloneNode(true));
  }
}

customElements.define("custom-flex", Flex);
