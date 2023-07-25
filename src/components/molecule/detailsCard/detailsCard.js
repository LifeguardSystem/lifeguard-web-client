class DetailsCard extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("details-card-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
    this.header = this.shadowRoot.querySelector("div");
    this.anchor = this.shadowRoot.querySelector("a");
    this.heading = this.shadowRoot.querySelector("h3");
  }

  connectedCallback() {
    this.setAnchor();
    this.setTitle();
    this.setGroup();
  }

  setAnchor() {
    this.anchor.href = this.getAttribute("href") || "/";
  }

  setTitle() {
    this.heading.innerText = this.getAttribute("title");
  }

  setGroup() {
    const isHome = this.getAttribute("home");
    this.header.className = isHome === "true" ? "home" : "group";
  }
}

customElements.define("custom-details-card", DetailsCard);
