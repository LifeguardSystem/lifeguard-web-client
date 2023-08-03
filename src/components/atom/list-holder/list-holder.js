class ListHolder extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("list-holder-template").content;

    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
  }
}

customElements.define("custom-list-holder", ListHolder);
