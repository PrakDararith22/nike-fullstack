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
    this.menu = ["New & Featured", "Men", "Women", "Kids", "Jordan", "Sale"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("icon-button", event => {
      const actions = event.detail.action;
      if (actions === "search-panel") {
        const searchPanel = document.querySelector("search-panel");
        searchPanel.togglePanel();
      }
      if (actions === "menu-panel") {
        const menuPanel = document.querySelector("menu-panel");
        menuPanel.togglePanel();
      }
    });
    this.addEventListener("search-input", event => {
      const actions = event.detail.action;
      if (actions === "searchClose") {
        const searchPanel = document.querySelector("search-panel");
        searchPanel.togglePanel();
      }
    });
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
    <div class="base-header items-center mx-3">
      <!-- logo section -->
      <div class="base-header-span justify-self-start">
        <icon-button icon="${nike}" size="2.2" to="/home"></icon-button>
      </div>

      <!-- menu section -->
      <div class="base-header-span justify-self-center">
        <div class="flex gap-6 hide-mobile text-h5 whitespace-nowrap">
          ${this.menu
            .map(item => {
              const path = item
                .toLowerCase()
                .replace(/&/g, "and") // Replace "&" with "and"
                .replace(/\s+/g, "-"); // Replace spaces with "-"
              return `<a href="/${path}">${item}</a>`;
            })
            .join("")}
        </div>
      </div>

      <!-- icon section -->
      <div class="base-header-span justify-self-end">
        <div class="flex">
          <search-input text="search" type="search" size="small" class="hide-mobile" icon=${search} action="searchClose"></search-input>
          <icon-button icon="${cartEmpty}" to="/cart"></icon-button>
          <icon-button icon="${search}" action="search-panel" class="hide-tablet hide-desktop"></icon-button>
          <icon-button icon="${heart}" to="/favorite"></icon-button>
          <icon-button icon="${menu}" action="menu-panel" class="hide-tablet hide-desktop"></icon-button>
        </div>
      </div>
    </div>

    <!-- panel -->
    <search-panel></search-panel>
    <menu-panel></menu-panel>

    `;
    this.render();
  }
}

customElements.define("base-header", BaseHeader);
