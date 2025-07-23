import { search } from "@assets";

class searchInput extends BaseComponent {
  static get observedAttributes() {
    return ["text"];
  }

  constructor() {
    super();
    this.text = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "text":
          this.text = newValue || "";
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
      <icon-button icon="${search}"></icon-button>
      <input type="text" placeholder="${this.text}" 
      class="outline-none border-none body-sm w-full bg-transparent text-p1 font-semibold text-gray-500"/>
    </div>
    `;

    this.render();
  }
}

customElements.define("search-input", searchInput);
