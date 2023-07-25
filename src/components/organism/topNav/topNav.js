class TopNav extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("topNav-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
  }
}

customElements.define("custom-top-nav", TopNav);
