import "@components";
import { cartEmpty, search, heart, menu, nike } from "@assets";
import "./base-header.css";

class BaseHeader extends BaseComponent {
  static get observedAttributes() {
    return ["test"];
  }

  constructor() {
    super();
    this.test = "";
    this.menu = ["New & Featured", "Men", "Women", "Kids", "Jordan", " Sale"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "icon": {
          this.icon = newValue || "";
          break;
        }
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = /* html */ `
    <div class="base-header layout-grid items-center ">
      <!-- logo section -->
      <div class="col-third-sm justify-self-start">
        <icon-button icon="${nike}" size="2"></icon-button>
      </div>

      <!-- menu section -->
      <div class="col-third-sm justify-self-center">
        <div class="flex gap-2 hide-mobile">
          ${this.menu.map(item => `<a>${item}</a>`).join("")}
        </div>
      </div>

      <!-- icon section -->
      <div class="col-third-sm justify-self-end">
        <div class="flex">
        <search-input text="search" class="hide-mobile"></search-input>
          <icon-button icon="${cartEmpty}"></icon-button>
          <icon-button icon="${search}" class="hide-tablet hide-desktop"></icon-button>
          <icon-button icon="${heart}"></icon-button>
          <icon-button icon="${menu}" class="hide-tablet hide-desktop"></icon-button>
        </div>
      </div>
    </div>

    `;
    this.render();
  }
}

customElements.define("base-header", BaseHeader);
