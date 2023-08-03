class Summary extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("summary-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
  }
}

customElements.define("custom-summary", Summary);
