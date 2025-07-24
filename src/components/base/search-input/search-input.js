import { search } from "@assets";

class searchInput extends BaseComponent {
  static get observedAttributes() {
    return ["text", "disabled", "action"];
  }

  constructor() {
    super();
    this.text = "";
    this.disabled = false;
    this.action = "";
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
        default:
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `
    <div class="search-input bg-gray-200 flex items-center px-3 rounded-lg w-full">
      <icon-button icon="${search}" "></icon-button>
      <input type="text" placeholder="${this.text} ${this.disabled ? "disabled" : ""}" 
      class="outline-none border-none body-sm w-full bg-transparent text-p1 font-semibold text-gray-500"/>
    </div>
    `;

    this.render();
  }
}

customElements.define("search-input", searchInput);
