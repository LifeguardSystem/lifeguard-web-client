class LeftMenu extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("leftMenu-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );
    this.button = this.shadowRoot.querySelector("button");
    this.menu = this.shadowRoot.querySelector("nav");

    this.setButton();
  }

  setButton() {
    this.button.addEventListener("click", () => {
      const buttonText = {
        opened: "Fechar Menu",
        closed: "Abrir menu",
      };

      this.menu.classList.toggle("opened");
      
      const menuState = this.menu.className === "opened" ? "opened" : "closed";
      this.button.innerText = buttonText[menuState];
    });
  }
}

customElements.define("custom-left-menu", LeftMenu);
