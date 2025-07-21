class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["text", "variant"];
  }

  constructor() {
    super();
    this.text = "";
    this.variant = "primary";
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
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    let classes = "outline-none border-none px-5 py-2 rounded-lg text-h5";

    if (this.variant === "primary") {
      classes += " bg-black text-white";
    } else if (this.variant === "secondary") {
      classes += " bg-white text-black";
      console.log("done");
    }

    this.template = `
    <button class="${classes}">${this.text}</button>
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
