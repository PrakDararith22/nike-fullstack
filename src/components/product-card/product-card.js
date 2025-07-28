import "@components";

class ProductCard extends BaseComponent {
  static get observedAttributes() {
    return ["status", "title", "category", "price", "type", "image"];
  }

  constructor() {
    super();
    this.title = "";
    this.status = "";
    this.category = "";
    this.price = "";
    this.image = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "title": {
          this.title = newValue || "";
          break;
        }
        case "status": {
          this.status = newValue || "";
          break;
        }
        case "category": {
          this.category = newValue || "";
          break;
        }
        case "price": {
          this.price = newValue || "";
          break;
        }
        case "type": {
          this.type = newValue || "";
          break;
        }
        case "image": {
          this.image = newValue || "";
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
    <div styles="min-width: 350px">

      <img src="${this.image}" alt="Banner" class="w-full h-full relative z-base"/>
      <div>
        <h5 class="text-warning font-semibold">${this.status}<h5>
        <h4 class="font-medium">${this.title}</h4>
        <p class="text-p2 font-regular pt-1">${this.category}</p>
        <h4 class="font-regular pt-4">${this.price}</h4>
      </div>

    </div>
   
    `;
    this.render();
  }
}

customElements.define("product-card", ProductCard);
