class searchInput extends BaseComponent {
  static get observedAttributes() {
    return ["text", "disabled", "action", "type", "icon"];
  }

  constructor() {
    super();
    this.text = "";
    this.disabled = false;
    this.action = "";
    this.type = "";
    this.icon = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("click", event => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      this.emitAction();
    });
  }

  emitAction() {
    console.log("search input here");
    if (this.disabled || !this.action) return;
    this.dispatchEvent(
      new CustomEvent("search-input", {
        bubbles: true,
        composed: true,
        detail: {
          action: this.action,
        },
      })
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "text":
          this.text = newValue || "";
          break;
        case "action":
          this.action = newValue || "";
          break;
        case "disabled":
          this.disabled = newValue !== null;
          break;
        case "type":
          this.type = newValue || "";
          break;
        case "icon":
          this.icon = newValue || "";
          break;
        default:
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const typeMap = {
      search: "rounded-lg bg-gray-200",
      input: "py-4 border rounded-sm bg-transparent",
      default: "rounded-lg bg-gray-200",
    };
    console.log(this.type);
    this.template = `
    <div class="search-input  flex items-center px-1  w-full flex items-center
    ${typeMap[this.type] || typeMap.default}">
      <icon-button icon="${this.icon}" size="0.9"></icon-button>
      <input type="text" placeholder="${this.text} ${this.disabled ? "disabled" : ""}" 
      class="outline-none border-none body-sm w-full bg-transparent text-p2 font-semibold text-gray-500"/>
    </div>
    `;

    this.render();
  }
}

customElements.define("search-input", searchInput);
