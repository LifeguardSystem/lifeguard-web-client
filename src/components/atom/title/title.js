class Title extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("title-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
    this.type = this.getAttribute("type");
    this.setType();
    this.setIcon();
  }

  setType() {
    const title = this.shadowRoot.querySelector("h2");
    title.className = this.type || "";
  }

  setIcon() {
    const iconWrapper = this.shadowRoot.querySelector("span");
    const icons = {
      warnings: document.getElementById("title-warning").content,
      problems: document.getElementById("title-problem").content,
      normal: document.getElementById("title-check").content,
    };
    iconWrapper.append(icons?.[this.type]);
  }
}

customElements.define("custom-title", Title);
