class Dialog extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("dialog-template").content;
    this.attachShadow({ mode: "open" }).append(this.template.cloneNode(true));

    this.btnEl = this.shadowRoot.getElementById("btn");
    this.dialogEl = this.shadowRoot.getElementById("dialog");
    this.contentEl = this.shadowRoot.getElementById("content");
  }

  connectedCallback() {
    this.setEvents();
    this.setBtnText();
  }

  setEvents() {
    this.btnEl.addEventListener("click", () => this.dialogEl.showModal());
    this.dialogEl.addEventListener("click", () => this.dialogEl.close());
    this.contentEl.addEventListener("click", (event) =>
      event.stopPropagation()
    );
  }

  setBtnText() {
    this.btnEl.innerText = this.btn;
  }
}

customElements.define("custom-dialog", Dialog);
