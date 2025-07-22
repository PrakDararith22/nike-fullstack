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
    this.type = "list";
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
    const isDetailView = this.type === "detail";
    const isListView = this.type === "list";
    console.log(isDetailView);

    this.template = /* html */ `
    <div>

    <!-- product page detail view -->
      <div class="px-4 ${isDetailView ? "" : "hidden"}">
        <h5 class="text-warning font-semibold">${this.status}<h5>
        <h4 class="font-medium">${this.title}</h4>
        <p class="text-p2 font-regular">${this.category}</p>
        <p class="text-p2 font-regular pb-3">8 colours</p>
        <h4 class="font-regular">${this.price}</h4>
      </div>

      <img src="${this.image}" alt="Banner" class="w-full h-full relative z-base"/>

       <!-- product list detail -->
      <div class="px-4 ${isListView ? "" : "hidden"}">
        <h5 class="text-warning font-semibold">${this.status}<h5>
        <h4 class="font-medium">${this.title}</h4>
        <p class="text-p2 font-regular">${this.category}</p>
        <p class="text-p2 font-regular pb-3">8 colours</p>
        <h4 class="font-regular">${this.price}</h4>
      </div>
     




      
      <div class="flex flex-col gap-2 ${isDetailView ? "" : "hidden"}">
        <div class="flex justify-between items-center ">
          <h5 class="font-semibold">Select Size</h5> 
          <a>Size Guide</a> 
        </div>
        <div>
          <base-button variant="secondary" type="status" text="sffsf"></base-button>
          <base-button variant="secondary" type="status" text="sffsf"></base-button>
          <base-button variant="secondary" type="status" text="sffsf"></base-button>
          <base-button variant="secondary" type="status" text="sffsf"></base-button>
        </div>
      </div>

    </div>
   
    `;
    this.render();
  }
}

customElements.define("product-card", ProductCard);
