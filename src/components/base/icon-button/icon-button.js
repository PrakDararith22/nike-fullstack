import "./icon-button.css";

class IconButton extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "size", "toggle-icon", "disabled", "text", "to", "action"];
  }

  constructor() {
    super();
    this.icon = "";
    this.text = "";
    this.size = 1;
    this.originalIcon = "";
    this.toggleIcon = "";
    this.hasToggleIcon = false;
    this.isToggled = false;
    this.disabled = false;
    this.to = "";
    this.action = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("click", event => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (this.to) {
        return;
      }

      if (this.hasToggleIcon) {
        this.isToggled = !this.isToggled;
        this.setToggleIcon();
      }
      this.emitAction();
    });
  }

  emitAction() {
    if (this.disabled || !this.action) return;
    this.dispatchEvent(
      new CustomEvent("icon-button", {
        bubbles: true,
        composed: true,
        detail: {
          action: this.action,
        },
      })
    );
  }

  static validateSize(value) {
    const num = parseFloat(value);
    if (Number.isNaN(num) || num <= 0) {
      console.warn(`Invalid size value: ${value}. Using default size 1.`);
      return 1;
    }
    return Math.min(Math.max(num, 0.1), 8);
  }

  setToggleIcon() {
    this.icon = this.isToggled ? this.toggleIcon : this.originalIcon;
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "icon": {
          this.icon = newValue || "";
          if (!this.originalIcon) {
            this.originalIcon = newValue || "";
          }
          break;
        }
        case "size": {
          const newSize = IconButton.validateSize(newValue);
          // Only update if the size actually changed to prevent unnecessary re-renders
          if (newSize !== this.size) {
            this.size = newSize;
          }
          break;
        }
        case "toggle-icon": {
          this.toggleIcon = newValue || "";
          this.hasToggleIcon = Boolean(newValue);
          break;
        }
        case "disabled": {
          this.disabled = newValue !== null;
          break;
        }
        case "text": {
          this.text = newValue || "";
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
    const hasIcon = Boolean(this.icon);
    const hasText = Boolean(this.text);
    const isLink = Boolean(this.to);

    // Generate appropriate alt text for accessibility
    const altText = hasText ? this.text : "Button";

    // Build the button content
    let buttonContent = "";

    if (hasIcon) {
      buttonContent += `<img src="${this.icon}" alt="${altText}" class="icon-image" ${this.disabled ? "disabled" : ""}/>`;
    }

    if (hasText) {
      buttonContent += `<span class="text-p2 font-semibold ${hasIcon ? "ml-2" : ""}">${this.text}</span>`;
    }
    if (!hasIcon && !hasText) {
      console.warn("IconButton: Neither icon nor text provided. Button may not be accessible.");
      buttonContent = "<p class='text-p2 font-semibold'></p>";
    }
    const currentSize = this.size || 1;

    this.template = `
    ${
      isLink
        ? `<a href="${this.to}" class="icon-button border-none bg-transparent flex items-center  hover-bg-primary rounded-sm p-1"
            style="--icon-scale: ${currentSize}; transform: scale(var(--icon-scale));"
            ${this.disabled ? "aria-disabled='true' tabindex='-1'" : ""}>
            ${buttonContent}
          </a>`
        : `<button class="icon-button border-none bg-transparent flex items-center justify-center hover-bg-primary rounded-sm p-1"
            style="--icon-scale: ${currentSize}; transform: scale(var(--icon-scale));"
            ${this.disabled ? "disabled" : ""}>
            ${buttonContent}
          </button>`
    }
  `;

    this.render();
  }

  // Public methods for external control
  toggle() {
    if (this.hasToggleIcon) {
      this.isToggled = !this.isToggled;
      this.setToggleIcon();
    }
  }

  setToggleState(toggled) {
    if (this.hasToggleIcon) {
      this.isToggled = Boolean(toggled);
      this.setToggleIcon();
    }
  }

  setText(newText) {
    this.text = newText || "";
    this.setAttribute("text", this.text);
    this.updateTemplate();
  }

  setIcon(newIcon) {
    this.icon = newIcon || "";
    this.originalIcon = newIcon || "";
    this.setAttribute("icon", this.icon);
    this.updateTemplate();
  }

  disable() {
    this.disabled = true;
    this.setAttribute("disabled", "");
    this.updateTemplate();
  }

  enable() {
    this.disabled = false;
    this.removeAttribute("disabled");
    this.updateTemplate();
  }
}

customElements.define("icon-button", IconButton);
