import { cross } from "@assets";

class PromoBanner extends BaseComponent {
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
        <div class="w-full p-5 border border-black">
            <div  class="flex justify-between">
                <p class="text-warning text-h4 font-semibold ">Free Delivery for Members</p>
                <icon-button icon="${cross}"></icon-button>
            </div>
            <div class="flex gap-1">
                <p>Become a Nike Member to get fast and free delivery.</p>
                <a>Join us</a> or <a>Sign In</a> 
            </div>
        </div>
    `;
    this.render();
  }
}

customElements.define("promo-banner", PromoBanner);
