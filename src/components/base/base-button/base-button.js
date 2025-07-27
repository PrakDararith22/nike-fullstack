class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["text", "variant", "icon", "type", "size", "to", "action"];
  }

  constructor() {
    super();
    this.text = "";
    this.variant = "primary";
    this.icon = "";
    this.type = "action";
    this.size = "";
    this.to = "";
    this.action = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("click", event => {
      this.emitAction();
      if (this.to) {
        window.location.href = this.to;
      }
    });
  }

  emitAction() {
    if (this.disabled || !this.action) return;
    this.dispatchEvent(
      new CustomEvent("base-button", {
        bubbles: true,
        detail: {
          action: this.action,
        },
      })
    );
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
        case "size": {
          this.size = newValue || "";
          break;
        }
        case "to": {
          this.to = newValue || "";
          break;
        }
        case "action": {
          this.action = newValue || "";
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
      primary: " bg-black text-white",
      secondary: "bg-white text-black ",
      default: " bg-black text-white ",
    };

    const typeMap = {
      action: " rounded-lg",
      status: " rounded",
    };

    const sizeMap = {
      small: " py-2",
      medium: " py-3 rounded-xl",
      large: " py-4 rounded-xl",
      default: " py-2 ",
    };

    this.template = `
    <button class="flex items-center border justify-center gap-2 outline-none  w-full px-5 text-p1 font-medium 
      ${sizeMap[this.size] || sizeMap.default} 
      ${typeMap[this.type]} 
      ${variantMap[this.variant]}">
      ${this.text}
      <img src="${this.icon}" class="object-contain" style="width: 18px; height: auto;" />

    </button>
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
