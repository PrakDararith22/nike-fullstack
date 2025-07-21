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
    <div class="search-input bg-gray-200 flex items-center px-3 border border-medium rounded-sm w-full">
      <icon-button icon="${search}"></icon-button>
      <input type="text" placeholder="${this.text}" 
      class="outline-none border-none body-sm w-full bg-transparent"/>
    </div>
    `;

    this.render();
  }
}

customElements.define("search-input", searchInput);
