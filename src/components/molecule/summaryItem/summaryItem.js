class SummaryItem extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("summaryItem-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
  }
}

customElements.define("custom-summary-item", SummaryItem);
