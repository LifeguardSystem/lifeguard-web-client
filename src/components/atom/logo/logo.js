class Logo extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("logo-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
  }
}

customElements.define("custom-logo", Logo);
