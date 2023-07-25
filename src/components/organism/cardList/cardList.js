class CardList extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("card-list-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
  }
}

customElements.define("custom-card-list", CardList);
