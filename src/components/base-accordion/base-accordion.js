import "@components";
import "./base-accordion.css";

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
        this.toggleAccordion();
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

  toggleAccordion() {
    this.open = !this.open;
    const content = this.querySelector("#link-section");
    const wrapper = this.querySelector("#content-wrapper");
    const iconButton = this.querySelector("icon-button");

    if (content && wrapper) {
      if (this.open) {
        const height = wrapper.scrollHeight;
        content.style.height = `${height}px`;
        content.classList.add("open");
        setTimeout(() => {
          if (this.open) {
            content.style.height = "auto";
          }
        }, 350);
      } else {
        const height = wrapper.scrollHeight;
        content.style.height = `${height}px`;
        requestAnimationFrame(() => {
          content.style.height = "0px";
          content.classList.remove("open");
        });
      }
    }

    if (iconButton) {
      if (this.open) {
        iconButton.classList.add("rotated");
      } else {
        iconButton.classList.remove("rotated");
      }
    }
  }

  updateTemplate() {
    this.template = /* html */ `
    <style>
   
    </style>
    <div class="${this.Noborder ? "" : "border-y border-gray-200"}">
        <div class="accordion-header flex items-center justify-between py-4 px-2 rounded-lg">
             <p class="accordion-title">${this.title}</p>
            <icon-button 
              icon="${this.icon}" 
              toggle-icon="${this.toggleIcon}" 
              action="accordion"
            ></icon-button>
        </div>
        <div id="link-section">
          <div id="content-wrapper" class="flex flex-col gap-2">
            <div class="text-gray-600">
              ${this.content}
            </div>
          </div>
        </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("base-accordion", BaseAccordion);
