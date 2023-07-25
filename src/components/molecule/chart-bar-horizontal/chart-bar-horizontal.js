class ChartBarHorizontal extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById(
      "chart-bar-horizontal-template"
    ).content;

    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );

    this.value = 0;
    this.percentage = 0;

    this.bar = this.shadowRoot.getElementById("bar");
    this.badge = this.shadowRoot.getElementById("value");
  }

  static get observedAttributes() {
    return ["value", "percentage"];
  }

  attributeChangedCallback() {
    this.value = this.getAttribute("value");
    this.percentage = this.getAttribute("percentage");

    this.bar.style.setProperty("--percent", `${this.percentage}%`);
    this.badge.innerText = this.value;
  }
}

customElements.define("custom-chart-bar-horizontal", ChartBarHorizontal);
