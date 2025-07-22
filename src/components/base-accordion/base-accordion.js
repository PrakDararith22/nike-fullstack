import "@components";

class BaseAccordion extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "toggle-icon", "title"];
  }

  constructor() {
    super();
    this.icon = "";
    this.toggleIcon = "";
    this.open = false;
    this.title = "";
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
    <div class="">
        <div class="flex items-center justify-between py-2 "> 
            <p>${this.title}</p>
            <icon-button icon="${this.icon}" toggle-icon="${this.toggleIcon}" action="accordion" ></icon-button>
        </div>
        <div id="link-section" class="hidden flex flex-col gap-2">
            <a> sdfsdf </a>
            <a> sdfsdf </a>
            <a> sdfsdf </a>
        </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("base-accordion", BaseAccordion);
