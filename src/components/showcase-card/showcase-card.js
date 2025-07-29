class ShowCaseCard extends BaseComponent {
  static get observedAttributes() {
    return ["type1", "type2", "image", "title", "description", "layout", "cta", "color"];
  }

  constructor() {
    super();
    this.type1 = "";
    this.type2 = "";
    this.image = "";
    this.title = "";
    this.description = "";
    this.layout = "";
    this.cta = "";
    this.color = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "type1":
          this.type1 = newValue;
          break;
        case "type2":
          this.type2 = newValue;
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
        case "color":
          this.color = newValue;
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
    const typeMap = {
      hero: "aspect-wide",
      lifestyle: "aspect-landscape",
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

    const textColor = {
      black: "text-black",
      white: "text-white",
      default: "text-white",
    };
    this.template = /* html */ `
    <div class="relative flex ${layout[this.layout] || layout.default} w-full 
    ${window.innerWidth <= 1080 ? typeMap[this.type1] || typeMap.default : typeMap[this.type2] || typeMap.default}">
      <img src="${this.image}" alt="Banner" class="object-cover w-full h-full absolute z-base"/>
      <div class="relative z-sticky m-6 ${textColor[this.color] || textColor.default} flex flex-col gap-4">
        <div class="pb-2">
          <p class="font-semibold">${this.description}</p>
          <p class="font-semibold text-h3">${this.title}</p>
        </div>
        <base-button 
        text="${this.cta}"  
        variant="secondary" 
        style="width: 80px" 
        class="align-self-start"></base-button>
      </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("showcase-card", ShowCaseCard);
