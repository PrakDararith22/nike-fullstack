import "./hero-banner.css";
import banner from "../../assets/banner.png";

class HeroBanner extends BaseComponent {
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
    <div class="hero-banner relative flex items-end justify-center">
      <img src="${banner}" alt="Banner" class="object-cover w-full h-full absolute z-base"/>
      <div class="relative z-sticky m-6 text-white text-center flex flex-col gap-4">
        <div>
          <p>Fear Nothing</p>
          <h3>Nike National Team Collections</h3>
        </div>
        <base-button text="Shop"  variant="secondary"></base-button>
      </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("hero-banner", HeroBanner);
