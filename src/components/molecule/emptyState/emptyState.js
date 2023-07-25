class EmptyState extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("empty-state-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
    this.imageHolder = this.shadowRoot.querySelector(".empty");
    this.setEmptyContent();
  }

  setEmptyContent() {
    const emojis = [
      "(￣▽￣)",
      "(⌒_⌒;)",
      "( 〃▽〃)",
      "(*μ_μ)",
      "(--_--)",
      "(＞﹏＜)",
      "(-_-)",
      "(T_T)",
      "(×﹏×)",
    ];
    this.imageHolder.innerText = this.getRandomItemInArray(emojis);
  }

  getRandomItemInArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

customElements.define("custom-empty-state", EmptyState);
