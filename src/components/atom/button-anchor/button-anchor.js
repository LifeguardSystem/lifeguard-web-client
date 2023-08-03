class ButtonAnchor extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("button-anchor-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );

    this.href = "/";
    this.btn = this.shadowRoot.getElementById("anchor");
  }

  connectedCallback() {
    this.setAnchorPath();
  }

  static get observedAttributes() {
    return ["href"];
  }

  attributeChangedCallback() {
    this.href = this.getAttribute("href");
    this.setAnchorPath();
  }

  setAnchorPath() {
    this.btn.href = this.href;
  }
}

customElements.define("custom-button-anchor", ButtonAnchor);
