class Skeleton extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("skeleton-template").content;
    this.attachShadow({ mode: "open" }).append(this.template.cloneNode(true));
    this.skeleton = this.shadowRoot.getElementById("skeleton");
  }

  connectedCallback() {
    this.setHeight();
  }

  setHeight() {
    const height = this.getAttribute("height") || 3;
    this.skeleton.style.height = `${height}rem`;
  }
}

customElements.define("custom-skeleton", Skeleton);
