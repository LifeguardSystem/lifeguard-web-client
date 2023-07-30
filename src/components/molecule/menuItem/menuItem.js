class MenuItem extends HTMLElement {
  constructor() {
    super();
    this.template = document.getElementById("menuItem-template").content;
    this.attachShadow({ mode: "open" }).appendChild(
      this.template.cloneNode(true)
    );

    // Props
    this.path = "/";
    this.monitoring = "0";
    this.warnings = "0";
    this.problems = "0";
  }

  connectedCallback() {
    this.getAttributes();

    this.setAnchorLink();
    this.setIndicators();
    this.setStyleAsSelectedPage();
  }

  static get observedAttributes() {
    return ["monitoring", "warnings", "problems"];
  }

  attributeChangedCallback() {
    this.getAttributes();
    this.setIndicators();
  }

  getAttributes() {
    this.path = this.getAttribute("href") || "/";
    this.monitoring = this.getAttribute("monitoring");
    this.warnings = this.getAttribute("warnings");
    this.problems = this.getAttribute("problems");
  }

  setAnchorLink() {
    const anchor = this.shadowRoot.querySelector("a");
    anchor.href = this.path;
  }

  setStyleAsSelectedPage() {
    const hasParams = (path) => path.includes("?");

    const listItem = this.shadowRoot.querySelector("li");
    const queryParams = window.location.search;

    const noneHasParams = !hasParams(queryParams) && !hasParams(this.path);
    const bothHaveParams = hasParams(queryParams) && hasParams(this.path);

    if (noneHasParams) {
      return (listItem.className = "selected");
    }

    if (bothHaveParams) {
      return (listItem.className =
        this.path.includes(queryParams) && "selected");
    }
  }

  setIndicators() {
    const monitoring = this.shadowRoot.getElementById("monitoring");
    const warnings = this.shadowRoot.getElementById("warnings");
    const problems = this.shadowRoot.getElementById("problems");

    monitoring.innerText = this.monitoring;
    warnings.innerText = this.warnings;
    problems.innerText = this.problems;
  }
}

customElements.define("custom-menu-item", MenuItem);
