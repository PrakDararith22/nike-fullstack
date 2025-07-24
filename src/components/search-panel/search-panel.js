import "./search-panel.css";
import { cross } from "@assets";

class SearchPanel extends BaseComponent {
  static get observedAttributes() {
    return ["test"];
  }

  constructor() {
    super();
    this.test = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("icon-button", event => {
      const actions = event.detail.action;
      if (actions === "searchClose") {
        this.togglePanel();
      }
    });
  }

  togglePanel() {
    console.log("clicked");

    const panel = this.querySelector(".search-panel");
    if (panel) {
      panel.classList.toggle("open");
    }
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
    <div class="search-panel fixed z-tooltip w-full top-0 right-0 ">
        <div class="search-panel-content bg-white pt-4 px-8">
          <div class="flex gap-5">
              <search-input text="Search" class="grow"></search-input>
              <icon-button icon="${cross}" action="searchClose"></icon-button>
          </div>

          <div class="px-8 pt-10 flex flex-col gap-4">
              <p>Popular Search Terms</p>
              <h3>kobe</h3>
              <h3>kobe</h3>
              <h3>kobe</h3>
          </div>
        </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("search-panel", SearchPanel);
