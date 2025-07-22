class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["text", "variant", "icon", "type"];
  }

  constructor() {
    super();
    this.text = "";
    this.variant = "primary";
    this.icon = "";
    this.type = "action";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "text": {
          this.text = newValue || "";
          break;
        }
        case "variant": {
          this.variant = newValue || "";
          break;
        }
        case "icon": {
          this.icon = newValue || "";
          break;
        }
        case "type": {
          this.type = newValue || "";
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
    const variantMap = {
      primary: " bg-black text-white border-none",
      secondary: " bg-white text-black border-thin",
      default: " bg-black text-white",
    };

    const typeMap = {
      action: " rounded-lg",
      status: " rounded",
    };

    this.template = `
    <button class="flex items-center justify-center gap-2 outline-none  w-full px-5 py-2 text-h5 ${typeMap[this.type]} ${variantMap[this.variant]}">
      ${this.text}
      <img src="${this.icon}" />
    </button>
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
