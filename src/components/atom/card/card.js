class Card extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("card-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
    
    this.setType();
  }

  setType() {
    const card = this.shadowRoot.querySelector("section");
    card.className = this.getAttribute("type") || "";
  }
}

customElements.define("custom-card", Card);
