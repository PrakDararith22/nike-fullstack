import "@components";

class BaseAccordion extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "toggle-icon", "title", "no-border", "content"];
  }

  constructor() {
    super();
    this.icon = "";
    this.toggleIcon = "";
    this.open = false;
    this.title = "";
    this.Noborder = "";
    this.content = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("icon-button", event => {
      const identification = event.detail.action;
      if (identification === "accordion") {
        this.open = !this.open;

        const body = this.querySelector("#link-section");
        if (body) {
          body.classList.toggle("hidden", !this.open);
        }
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
        case "toggle-icon": {
          this.toggleIcon = newValue || "";
          break;
        }
        case "title": {
          this.title = newValue || "";
          break;
        }
        case "no-border": {
          this.Noborder = newValue !== null;
          break;
        }
        case "content": {
          this.content = newValue || "";
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
    <div class=" ${this.Noborder ? "" : "border-y  border-gray-200"}">
        <div class="flex items-center justify-between py-4"> 
            <p>${this.title}</p>
            <icon-button icon="${this.icon}" toggle-icon="${this.toggleIcon}" action="accordion" ></icon-button>
        </div>
        <div id="link-section" class="hidden flex flex-col gap-2 py-2">
          ${this.content}
        </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("base-accordion", BaseAccordion);
