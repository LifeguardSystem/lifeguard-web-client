class MenuItem extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("menuItem-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );

    this.path = this.getAttribute("href") || "/";
    this.setAnchorLink();
    this.setSelected();
  }

  setAnchorLink() {
    const anchor = this.shadowRoot.querySelector("a");
    anchor.href = this.path;
  }

  setSelected() {
    const listItem = this.shadowRoot.querySelector("li");
    const pagePath = window.location.pathname;
    listItem.className = pagePath === this.path && "selected";
  }
}

customElements.define("custom-menu-item", MenuItem);
