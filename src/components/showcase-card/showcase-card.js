class ShowCaseCard extends BaseComponent {
  static get observedAttributes() {
    return ["type", "image", "title", "description", "layout", "cta"];
  }

  constructor() {
    super();
    this.type = "";
    this.image = "";
    this.title = "";
    this.description = "";
    this.layout = "";
    this.cta = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "type":
          this.type = newValue;
          break;
        case "image":
          this.image = newValue;
          break;
        case "title":
          this.title = newValue;
          break;
        case "description":
          this.description = newValue;
          break;
        case "layout":
          this.layout = newValue;
          break;
        case "cta":
          this.cta = newValue;
          break;
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const aspectRatio = {
      hero: "aspect-wide",
      feature: "aspect-landscape",
      category: "aspect-poster",
      lifestyle: "aspect-landscape",
      promo: "aspect-square",
      testimonial: "aspect-portrait",
      default: "aspect-square",
    };

    const layout = {
      topleft: "items-start justify-center",
      topcenter: "items-start justify-center",
      topright: "items-start justify-end",
      center: "items-center justify-center",
      bottomleft: "items-end justify-start",
      bottomcenter: "items-end justify-center",
      bottomright: "items-end justify-end",
      default: "items-end justify-center",
    };

    this.template = /* html */ `
    <div class="relative flex ${layout[this.layout] || layout.default} w-full ${aspectRatio[this.type] || aspectRatio.default}">
      <img src="${this.image}" alt="Banner" class="object-cover w-full h-full absolute z-base"/>
      <div class="relative z-sticky m-6 text-white text-center flex flex-col gap-4">
        <div>
          <p>${this.description}</p>
          <h3>${this.title}</h3>
        </div>
        <base-button text="${this.cta}"  variant="secondary"></base-button>
      </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("showcase-card", ShowCaseCard);
